import assert from "node:assert/strict";
import test from "node:test";
import { dataPhotoToBlob, saveProductImages, MAX_PHOTO_BYTES } from "../lib/product-images.ts";

// Small signature fixture used only by the isolated tests, never by the catalogue.
const png = "data:image/png;base64,iVBORw0KGgo=";
const old = [{ storage_path: "book/old.png", sort_order: 0 }];
function repository(initial = []) {
  const state = { rows: structuredClone(initial), calls: [] };
  const api = {
    existingPath: url => {
      if (!url.startsWith("https://photos.test/")) throw new Error("invalid image URL");
      return url.slice("https://photos.test/".length);
    },
    upload: async (blob, index) => { state.calls.push("upload:" + index); return "book/new-" + index + ".png"; },
    insert: async rows => { state.calls.push("insert"); state.rows.push(...rows); },
    removeReferences: async () => { state.calls.push("remove"); state.rows = []; },
  };
  return { state, api };
}

test("detects real PNG bytes despite a mislabelled JPEG data URL", () => {
  assert.equal(dataPhotoToBlob(png.replace("image/png", "image/jpeg")).type, "image/png");
});

test("rejects non-images and oversized images before uploading", async () => {
  assert.throws(() => dataPhotoToBlob("data:image/png;base64,SGVsbG8="), /valid/);
  const large = Buffer.alloc(MAX_PHOTO_BYTES + 1).toString("base64");
  assert.throws(() => dataPhotoToBlob("data:image/png;base64," + large), /10 MB/);
  const { state, api } = repository(old);
  await assert.rejects(saveProductImages([png, "data:image/png;base64,SGVsbG8="], old, api));
  assert.deepEqual(state.calls, []);
  assert.deepEqual(state.rows, old);
});

test("rejects six images without touching the existing gallery", async () => {
  const { state, api } = repository(old);
  await assert.rejects(saveProductImages(Array(6).fill(png), old, api), /lima/);
  assert.deepEqual(state.calls, []);
});

test("saving two new photos uploads both before publishing their references", async () => {
  const { state, api } = repository();
  const progress = [];
  const result = await saveProductImages([png, png], [], api, text => progress.push(text));
  assert.deepEqual(state.calls, ["upload:0", "upload:1", "insert"]);
  assert.deepEqual(state.rows, result);
  assert.equal(result.length, 2);
  assert.ok(progress.some(text => text.includes("2 dari 2")));
});

test("an upload failure preserves all live photo references", async () => {
  const { state, api } = repository(old);
  api.upload = async () => { throw new Error("offline"); };
  await assert.rejects(saveProductImages([png], old, api), /offline/);
  assert.deepEqual(state.rows, old);
  assert.deepEqual(state.calls, []);
});

test("saving unchanged gallery does not delete or reupload", async () => {
  const { state, api } = repository(old);
  await saveProductImages(["https://photos.test/book/old.png"], old, api);
  assert.deepEqual(state.calls, []);
});

test("appending a photo preserves existing references", async () => {
  const { state, api } = repository(old);
  await saveProductImages(["https://photos.test/book/old.png", png], old, api);
  assert.deepEqual(state.calls, ["upload:1", "insert"]);
  assert.equal(state.rows.length, 2);
  assert.deepEqual(state.rows[0], old[0]);
});

test("failed gallery replacement restores previous references", async () => {
  const { state, api } = repository(old);
  const insert = api.insert;
  let failed = false;
  api.insert = async rows => {
    if (!failed) { failed = true; throw new Error("insert failed"); }
    await insert(rows);
  };
  await assert.rejects(saveProductImages([png], old, api), /insert failed/);
  assert.deepEqual(state.rows, old);
});

test("failed restoration is reported without claiming the gallery is safe", async () => {
  const { api } = repository(old);
  api.insert = async () => { throw new Error("offline"); };
  await assert.rejects(saveProductImages([png], old, api), /tautan galeri perlu dipulihkan/);
});

test("validates external URLs before uploading or deleting", async () => {
  const { state, api } = repository(old);
  await assert.rejects(saveProductImages([png, "https://other.test/image.png"], old, api), /invalid/);
  assert.deepEqual(state.calls, []);
});
