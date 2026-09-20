const STORE = "drafts";
const KEY = "active-form";

async function database(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("dzikra-admin-drafts", 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error("Draft tidak dapat disimpan di browser. Jangan tutup form sebelum penyimpanan selesai."));
    request.onblocked = () => reject(new Error("Penyimpanan draft sedang dipakai tab lain."));
  });
}

export async function readAdminDraft<T>(): Promise<T | null> {
  const db = await database();
  try {
    return await new Promise<T | null>((resolve, reject) => {
      const request = db.transaction(STORE).objectStore(STORE).get(KEY);
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  } finally { db.close(); }
}

export async function writeAdminDraft<T>(draft: T | null): Promise<void> {
  const db = await database();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE, "readwrite");
      const store = transaction.objectStore(STORE);
      if (draft === null) store.delete(KEY);
      else store.put(draft, KEY);
      // Await commit, not just the request, before promising recovery on reload.
      transaction.oncomplete = () => resolve();
      transaction.onerror = transaction.onabort = () => reject(new Error("Draft belum tersimpan di browser. Jangan tutup halaman ini."));
    });
  } finally { db.close(); }
}
