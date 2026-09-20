"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Book } from "@/lib/catalog";
import { loadSupabaseBookBySlug, loadSupabaseCatalog, saveSupabaseBook } from "@/lib/supabase-catalog";
import { readAdminDraft, writeAdminDraft } from "@/lib/admin-drafts";
import { dataPhotoToBlob, MAX_PHOTO_BYTES, MAX_PRODUCT_PHOTOS } from "@/lib/product-images";

type Form = Omit<Book, "preorderPrice" | "retailPrice" | "weightGrams"> & { preorderPrice: string; retailPrice: string; weightGrams: string };
// New entries are publish-ready by default. Editors can still choose Draft
// explicitly when a product must remain private while it is being prepared.
const empty = (): Form => ({ id: "", slug: "", name: "", description: "", author: "", muhaqqiq: "", images: [], orderUrl: "", preorderPrice: "", retailPrice: "", preorderStartsAt: "", preorderEndsAt: "", preorderStatus: "UPCOMING", dimensions: "", weightGrams: "", coverType: "", status: "PREORDER" });
const formOf = (book: Book): Form => ({ ...empty(), ...book, images: book.images ?? [], author: book.author ?? "", muhaqqiq: book.muhaqqiq ?? "", orderUrl: book.orderUrl ?? "", preorderPrice: book.preorderPrice?.toString() ?? "", retailPrice: book.retailPrice?.toString() ?? "", weightGrams: book.weightGrams?.toString() ?? "", preorderStartsAt: book.preorderStartsAt ?? "", preorderEndsAt: book.preorderEndsAt ?? "", dimensions: book.dimensions ?? "", coverType: book.coverType ?? "" });
const isUuid = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
const messageOf = (error: unknown) => error instanceof Error ? error.message : "Koneksi database bermasalah. Coba lagi saat koneksi stabil.";

function readPhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const image = String(reader.result);
        dataPhotoToBlob(image);
        resolve(image);
      } catch (error) { reject(error); }
    };
    reader.onerror = reader.onabort = () => reject(new Error("Foto " + file.name + " tidak dapat dibaca. Pilih file lagi."));
    reader.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const [catalog, setCatalog] = useState<Book[]>([]);
  const [form, setForm] = useState<Form>(empty);
  const [ready, setReady] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [readingPhotos, setReadingPhotos] = useState(false);
  const [connection, setConnection] = useState("Menghubungkan katalog…");
  const [note, setNote] = useState("");
  const [draftNote, setDraftNote] = useState("");
  const busy = saving || readingPhotos || !ready;
  const operation = useRef(false);
  const draftQueue = useRef<Promise<void>>(Promise.resolve());

  // Serialize writes so an older auto-save cannot overwrite a newer draft.
  function backup(draft: Form | null) {
    const pending = draftQueue.current.catch(() => undefined).then(() => writeAdminDraft(draft));
    draftQueue.current = pending;
    return pending;
  }

  useEffect(() => {
    let active = true;
    async function initialize() {
      const [remote, restored] = await Promise.allSettled([loadSupabaseCatalog(), readAdminDraft<Form>()]);
      if (!active) return;
      if (remote.status === "fulfilled" && remote.value) {
        setCatalog(remote.value);
        setConnection("Terhubung ke Supabase.");
      } else {
        setConnection("Katalog belum dapat dimuat. Muat ulang saat koneksi tersedia.");
      }
      let draft = restored.status === "fulfilled" ? restored.value : null;
      // Read-only migration; never write large photos to localStorage.
      if (!draft) {
        try {
          const legacy: Book[] = localStorage.getItem("dzikra-legacy-draft-migrated-v1") ? [] : JSON.parse(localStorage.getItem("dzikra-catalog-draft-v2") ?? "[]");
          const unsaved = legacy.find(book => book.images?.some(image => image.startsWith("data:")));
          if (unsaved) {
            draft = formOf(unsaved);
            await backup(draft);
            localStorage.setItem("dzikra-legacy-draft-migrated-v1", "1");
          }
        } catch { /* A damaged legacy draft must not block the live catalogue. */ }
      }
      if (!active) return;
      if (draft) {
        setForm(draft);
        setDirty(true);
        setNote("Draft dipulihkan. Klik Simpan kitab untuk mengirim perubahan dan foto ke database.");
      } else if (restored.status === "rejected") {
        setDraftNote(messageOf(restored.reason));
      }
      setReady(true);
    }
    void initialize();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!ready || !dirty || saving || readingPhotos) return;
    const timer = window.setTimeout(() => {
      void backup(form).then(() => setDraftNote("Draft dicadangkan di browser; belum dipublikasikan."))
        .catch(error => setDraftNote(messageOf(error)));
    }, 250);
    return () => window.clearTimeout(timer);
  }, [form, dirty, ready, saving, readingPhotos]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function change(next: Form) { setForm(next); setDirty(true); setNote(""); }
  const set = (key: keyof Form, value: string) => change({ ...form, [key]: value });
  function select(next: Form) {
    if (busy || (dirty && !confirm("Ada perubahan yang belum dikirim ke database. Buang perubahan ini?"))) return;
    setForm(next);
    setDirty(false);
    setNote("");
    setDraftNote("");
    void backup(null).catch(error => setDraftNote(messageOf(error)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    if (operation.current || busy) return;
    operation.current = true;
    setSaving(true);
    let snapshot = { ...form };
    let backedUp = false;
    let savedToDatabase = false;
    try {
      const slug = (form.slug || form.name).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      if (!slug || !form.name.trim() || !form.description.trim()) throw new Error("Lengkapi nama, slug, dan deskripsi kitab.");
      snapshot = { ...form, slug, id: isUuid(form.id) ? form.id : crypto.randomUUID() };
      setForm(snapshot);
      setNote("Mencadangkan draft dan foto…");
      await backup(snapshot);
      backedUp = true;
      setNote("Memeriksa data kitab…");
      const existing = await loadSupabaseBookBySlug(slug);
      if (existing && existing.id !== snapshot.id) {
        if (isUuid(form.id)) throw new Error("Slug sudah dipakai kitab lain. Gunakan slug yang berbeda.");
        snapshot = { ...snapshot, id: existing.id };
        setForm(snapshot);
        await backup(snapshot);
      }
      const book: Book = { ...snapshot, name: snapshot.name.trim(), description: snapshot.description.trim(), author: snapshot.author || undefined, muhaqqiq: snapshot.muhaqqiq || undefined, orderUrl: snapshot.orderUrl?.trim() || undefined, preorderPrice: snapshot.preorderPrice ? Number(snapshot.preorderPrice) : undefined, retailPrice: snapshot.retailPrice ? Number(snapshot.retailPrice) : undefined, weightGrams: snapshot.weightGrams ? Number(snapshot.weightGrams) : undefined, preorderStartsAt: snapshot.preorderStartsAt || undefined, preorderEndsAt: snapshot.preorderEndsAt || undefined, dimensions: snapshot.dimensions || undefined, coverType: snapshot.coverType || undefined };
      const saved = await saveSupabaseBook(book, setNote);
      savedToDatabase = true;
      setCatalog(items => [saved, ...items.filter(item => item.id !== saved.id && item.slug !== saved.slug)]);
      setForm(formOf(saved));
      setDirty(false);
      setNote(saved.name + ": " + (saved.images?.length ?? 0) + " foto terverifikasi tersimpan. " + (saved.status === "DRAFT" ? "Status masih Draft, belum tampil di katalog publik." : "Siap dilihat di halaman detail."));
      await backup(null);
      setDraftNote("");
    } catch (error) {
      if (savedToDatabase) setDraftNote("Data sudah tersimpan, tetapi cadangan draft browser belum dapat dibersihkan.");
      else {
        setDirty(true);
        setNote("Belum selesai disimpan. " + messageOf(error));
        setDraftNote(backedUp ? "Draft dan foto dicadangkan. Perbaiki kendala di atas lalu klik Simpan kitab lagi." : "Draft belum berhasil dicadangkan. Jangan tutup halaman ini.");
      }
    } finally {
      operation.current = false;
      setSaving(false);
    }
  }

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length || operation.current || busy) return;
    if (files.length + (form.images?.length ?? 0) > MAX_PRODUCT_PHOTOS) {
      setNote("Maksimal lima foto per kitab. Pilih lebih sedikit foto.");
      return;
    }
    if (files.some(file => file.size > MAX_PHOTO_BYTES)) {
      setNote("Ukuran setiap foto maksimal 10 MB. Pilih file yang lebih kecil.");
      return;
    }
    operation.current = true;
    setReadingPhotos(true);
    setNote("Membaca foto dan mencadangkan draft…");
    try {
      const images = await Promise.all(files.map(readPhoto));
      const next = { ...form, images: [...(form.images ?? []), ...images] };
      setForm(next);
      setDirty(true);
      await backup(next);
      setNote(images.length + " foto ditambahkan ke draft. Klik Simpan kitab agar tampil di halaman detail.");
      setDraftNote("Draft dan foto dicadangkan di browser.");
    } catch (error) { setNote(messageOf(error)); }
    finally { operation.current = false; setReadingPhotos(false); }
  }

  return (
    <main className="admin">
      <a href="/" className="back">← Kembali ke situs</a>
      <div className="admin-heading">
        <div><p className="eyebrow">DZIKRA / ADMIN KATALOG</p><h1>Kelola koleksi</h1><p className="admin-copy">Unggah foto fisik kitab, lalu klik Simpan kitab. Maksimal lima foto, 10 MB per foto.</p><p className="admin-copy">{connection}</p></div>
        <div className="draft-note" role="status" aria-live="polite"><p>{note}</p><p>{draftNote}</p></div>
      </div>
      <div className="admin-grid">
        <section className="catalog-list">
          <div className="admin-section-head"><h2>Koleksi ({catalog.length})</h2><button disabled={busy} type="button" className="new-book" onClick={() => select(empty())}>+ Tambah kitab</button></div>
          {catalog.map(book => <article className={"admin-product " + (form.id === book.id ? "selected" : "")} key={book.id}>
            <button disabled={busy} type="button" className="product-select" onClick={() => select(formOf(book))}>
              <span className="mini-cover">{book.images?.[0] ? <img src={book.images[0]} alt="" /> : "—"}</span><span><b>{book.name}</b><small>{book.status} · {book.images?.length ?? 0} foto tersimpan</small></span>
            </button>
          </article>)}
        </section>
        <section className="editor">
          <div className="admin-section-head"><div><p className="eyebrow">EDITOR PRODUK</p><h2>{form.name || "Kitab baru"}</h2></div>{form.slug && form.status !== "DRAFT" && <a href={"/product/" + form.slug} target="_blank" rel="noreferrer">Lihat halaman detail ↗</a>}</div>
          <form onSubmit={save} aria-busy={busy}>
            <fieldset disabled={busy}><legend>Informasi utama</legend>
              <label>Nama kitab<input required value={form.name} onChange={e => set("name", e.target.value)} /></label>
              <label>Slug URL<input value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="Otomatis bila kosong" /></label>
              <label className="wide">Deskripsi<textarea required rows={4} value={form.description} onChange={e => set("description", e.target.value)} /></label>
              <label>Penulis<input value={form.author} onChange={e => set("author", e.target.value)} /></label>
              <label>Muhaqqiq<input value={form.muhaqqiq} onChange={e => set("muhaqqiq", e.target.value)} /></label>
            </fieldset>
            <fieldset disabled={busy}><legend>Harga & pre-order</legend>
              <label>Harga PO (Rp)<input type="number" min="0" value={form.preorderPrice} onChange={e => set("preorderPrice", e.target.value)} /></label>
              <label>Harga retail / satuan (Rp)<input type="number" min="0" value={form.retailPrice} onChange={e => set("retailPrice", e.target.value)} /></label>
              <label className="wide">URL form Tally<input type="url" value={form.orderUrl ?? ""} onChange={e => set("orderUrl", e.target.value)} placeholder="https://tally.so/r/..." /></label>
              <label>Status PO<select value={form.preorderStatus} onChange={e => set("preorderStatus", e.target.value)}><option value="UPCOMING">Akan dibuka</option><option value="OPEN">Dibuka</option><option value="CLOSED">Ditutup</option></select></label>
              <label>Status produk<select value={form.status} onChange={e => set("status", e.target.value)}><option value="DRAFT">Draft</option><option value="PREORDER">Pre-order</option><option value="READY">Tersedia</option><option value="SOLD_OUT">Habis</option></select></label>
              <label>Tanggal mulai PO<input type="date" value={form.preorderStartsAt} onChange={e => set("preorderStartsAt", e.target.value)} /></label>
              <label>Tanggal akhir PO<input type="date" value={form.preorderEndsAt} onChange={e => set("preorderEndsAt", e.target.value)} /></label>
            </fieldset>
            <fieldset disabled={busy}><legend>Spesifikasi & foto fisik kitab</legend>
              <label>Ukuran<input value={form.dimensions} onChange={e => set("dimensions", e.target.value)} /></label>
              <label>Berat (gram)<input type="number" min="0" value={form.weightGrams} onChange={e => set("weightGrams", e.target.value)} /></label>
              <label>Jenis cover<input value={form.coverType} onChange={e => set("coverType", e.target.value)} /></label>
              <label>Unggah foto (maks. 5)<input type="file" multiple accept="image/jpeg,image/png,image/webp" disabled={(form.images?.length ?? 0) >= MAX_PRODUCT_PHOTOS} onChange={upload} /></label>
              <div className="photo-previews">{(form.images ?? []).map((image, index) => <div key={index} className="photo-preview"><img src={image} alt={"Foto " + (index + 1)} /><small>{image.startsWith("data:") ? "Belum diunggah ke database" : "Tersimpan"}</small><button type="button" onClick={() => change({ ...form, images: form.images?.filter((_, i) => i !== index) })}>Hapus foto {index + 1}</button></div>)}</div>
            </fieldset>
            <div className="form-actions"><button disabled={busy} className="save-book" type="submit">{saving ? "Menyimpan…" : readingPhotos ? "Membaca foto…" : "Simpan kitab"}</button><button disabled={busy} type="button" onClick={() => select(empty())}>Kosongkan form</button></div>
          </form>
        </section>
      </div>
    </main>
  );
}
