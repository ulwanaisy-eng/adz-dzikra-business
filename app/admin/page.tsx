"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  id: string; titleAr: string; titleId: string; author: string; authorAr: string;
  description: string; price_po: string; price_normal: string; pages: string; size: string;
  cover: string; paper: string; images: string[]; status: string; badge: string;
  featured: boolean; orderUrl: string;
};
type Settings = {
  siteName: string; heroEyebrow: string; heroTitle: string; heroTitleAccent: string;
  heroDescription: string; heroPrimaryText: string; heroPrimaryUrl: string;
  heroSecondaryText: string; heroSecondaryUrl: string; featuredProductId: string;
  collectionEyebrow: string; collectionTitle: string; collectionDescription: string;
  announcementEnabled: boolean; announcementText: string; showAbout: boolean;
  showHowToOrder: boolean; showContact: boolean; whatsappNumber: string;
  instagramUrl: string; email: string; tallyUrl: string;
};

const emptyProduct: Product = {
  id: "", titleAr: "", titleId: "", author: "", authorAr: "", description: "",
  price_po: "", price_normal: "", pages: "", size: "", cover: "Hard Cover", paper: "",
  images: [], status: "published", badge: "Available", featured: false,
  orderUrl: "https://wa.me/62882000020979"
};

const emptySettings: Settings = {
  siteName: "DZIKRA", heroEyebrow: "", heroTitle: "", heroTitleAccent: "",
  heroDescription: "", heroPrimaryText: "Explore the Collection", heroPrimaryUrl: "#koleksi",
  heroSecondaryText: "How to Order", heroSecondaryUrl: "#cara-pesan", featuredProductId: "",
  collectionEyebrow: "Our Collection", collectionTitle: "", collectionDescription: "",
  announcementEnabled: false, announcementText: "", showAbout: true, showHowToOrder: true,
  showContact: true, whatsappNumber: "", instagramUrl: "", email: "", tallyUrl: ""
};

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
}
async function compressImage(file: File) {
  return new Promise<{ data: string; name: string }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 1500, scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale); canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d"); if (!ctx) return reject(new Error("Canvas error"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve({ data: canvas.toDataURL("image/jpeg", 0.82), name: file.name.replace(/\.[^.]+$/, ".jpg") });
      };
      img.onerror = () => reject(new Error("Gambar tidak bisa dibaca."));
      img.src = String(reader.result);
    };
    reader.onerror = () => reject(new Error("Gagal membaca gambar."));
    reader.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<Settings>(emptySettings);
  const [product, setProduct] = useState<Product>(emptyProduct);
  const [tab, setTab] = useState<"products" | "homepage">("products");
  const [editing, setEditing] = useState(false);
  const [files, setFiles] = useState<{data:string;name:string}[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/catalog", { cache: "no-store" });
    if (res.status === 401) { setLoggedIn(false); return; }
    const data = await res.json(); setProducts(data.products || []); setSettings(data.settings || emptySettings); setLoggedIn(true);
  }
  useEffect(() => { load(); }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMessage("");
    const res = await fetch("/api/admin/login", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({password}) });
    const data = await res.json(); setBusy(false);
    if (!res.ok) return setMessage(data.error || "Login gagal.");
    setPassword(""); await load();
  }

  function edit(p: Product) {
    setProduct({...p}); setFiles([]); setEditing(true); setTab("products"); window.scrollTo({top:0,behavior:"smooth"});
  }
  function newProduct() {
    setProduct({...emptyProduct, id: ""}); setFiles([]); setEditing(false); setTab("products"); window.scrollTo({top:0,behavior:"smooth"});
  }

  async function saveProduct(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMessage("");
    const finalProduct = {...product, id: slugify(product.id || product.titleId)};
    if (!finalProduct.id) { setBusy(false); return setMessage("Isi nama produk atau slug."); }
    try {
      const res = await fetch("/api/admin/catalog", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ product: finalProduct, images: files })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan");
      setMessage(data.message); await load(); setProduct({...emptyProduct}); setFiles([]); setEditing(false);
    } catch (err) { setMessage(err instanceof Error ? err.message : "Gagal menyimpan."); }
    setBusy(false);
  }

  async function saveHomepage(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMessage("");
    const featured = products.find(p => p.id === settings.featuredProductId);
    if (featured) {
      setProducts(products.map(p => ({...p, featured: p.id === featured.id})));
    }
    const res = await fetch("/api/admin/catalog", { method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({product: featured || products[0], settings}) });
    const data = await res.json(); setBusy(false);
    setMessage(res.ok ? "Homepage tersimpan. Vercel akan deploy otomatis." : (data.error || "Gagal menyimpan."));
  }

  if (!loggedIn) return (
    <main style={styles.page}><div style={styles.loginCard}>
      <div style={styles.brand}>DZIKRA <span>CMS</span></div><h1>Admin</h1>
      <p style={styles.muted}>Kelola produk dan tampilan website tanpa menyentuh kode.</p>
      <form onSubmit={login}><input style={styles.input} type="password" placeholder="Password admin" value={password} onChange={e=>setPassword(e.target.value)} autoFocus/>
      <button style={styles.primary} disabled={busy}>{busy ? "Memeriksa..." : "Masuk"}</button></form>
      {message && <div style={styles.error}>{message}</div>}
    </div></main>
  );

  const visibleProducts = useMemo(() => products, [products]);
  return <main style={styles.page}>
    <div style={styles.shell}>
      <header style={styles.header}><div><div style={styles.brand}>DZIKRA <span>CMS</span></div><h1>Store Manager</h1><p style={styles.muted}>Tambah produk seperti mengisi form seller. Perubahan akan masuk ke website saat deployment Vercel selesai.</p></div>
      <button style={styles.ghost} onClick={async()=>{await fetch("/api/admin/login",{method:"DELETE"});setLoggedIn(false)}}>Keluar</button></header>
      <div style={styles.tabs}><button style={tab==="products"?styles.tabActive:styles.tab} onClick={()=>setTab("products")}>Produk</button><button style={tab==="homepage"?styles.tabActive:styles.tab} onClick={()=>setTab("homepage")}>Tampilan awal</button></div>

      {tab==="products" ? <section>
        <div style={styles.toolbar}><div><h2>Produk</h2><p style={styles.muted}>{products.length} produk di katalog</p></div><button style={styles.primary} onClick={newProduct}>+ Tambah produk</button></div>
        <form onSubmit={saveProduct} style={styles.form}>
          <div style={styles.formTitle}>{editing ? "Edit produk" : "Produk baru"}</div>
          <div style={styles.grid2}><Field label="Nama produk" value={product.titleId} onChange={v=>setProduct({...product,titleId:v})} required/>
          <Field label="Judul Arab" value={product.titleAr} onChange={v=>setProduct({...product,titleAr:v})}/>
          <Field label="Penulis" value={product.author} onChange={v=>setProduct({...product,author:v})}/>
          <Field label="Slug / ID" value={product.id} onChange={v=>setProduct({...product,id:slugify(v)})} placeholder="contoh: al-adzkar"/></div>
          <Field label="Deskripsi" value={product.description} onChange={v=>setProduct({...product,description:v})} textarea/>
          <div style={styles.grid3}><Field label="Harga pre-order / jual" value={product.price_po} onChange={v=>setProduct({...product,price_po:v})} required/><Field label="Harga normal" value={product.price_normal} onChange={v=>setProduct({...product,price_normal:v})}/><Field label="Badge" value={product.badge} onChange={v=>setProduct({...product,badge:v})}/></div>
          <div style={styles.grid4}><Field label="Halaman" value={product.pages} onChange={v=>setProduct({...product,pages:v})}/><Field label="Ukuran" value={product.size} onChange={v=>setProduct({...product,size:v})}/><Field label="Binding" value={product.cover} onChange={v=>setProduct({...product,cover:v})}/><Field label="Kertas" value={product.paper} onChange={v=>setProduct({...product,paper:v})}/></div>
          <Field label="Link order WhatsApp / checkout" value={product.orderUrl} onChange={v=>setProduct({...product,orderUrl:v})}/>
          <div><label style={styles.label}>Foto produk</label><input style={styles.input} type="file" accept="image/*" multiple onChange={async e=>{setBusy(true);try{const picked=Array.from(e.target.files||[]);setFiles(await Promise.all(picked.map(compressImage)));}catch(err){setMessage(err instanceof Error?err.message:"Gagal memproses gambar.");}setBusy(false)}}/>
          <div style={styles.previewRow}>{[...product.images,...files.map(f=>f.data)].map((src,i)=><img key={i} src={src} style={styles.preview} alt="preview"/>)}</div></div>
          <div style={styles.checkRow}><label><input type="checkbox" checked={product.featured} onChange={e=>setProduct({...product,featured:e.target.checked})}/> Jadikan produk unggulan</label><select style={styles.select} value={product.status} onChange={e=>setProduct({...product,status:e.target.value})}><option value="published">Published</option><option value="draft">Draft</option></select></div>
          <div style={styles.actions}><button type="submit" style={styles.primary} disabled={busy}>{busy?"Menyimpan...":editing?"Simpan perubahan":"Publish produk"}</button>{editing&&<button type="button" style={styles.ghost} onClick={newProduct}>Batal</button>}</div>
        </form>
        <div style={styles.list}>{visibleProducts.map(p=><div key={p.id} style={styles.row}><img src={p.images?.[0]} style={styles.thumb} alt=""/><div style={{flex:1}}><strong>{p.titleId}</strong><div style={styles.muted}>{p.author} · {p.price_po} · {p.status}</div></div><button style={styles.ghost} onClick={()=>edit(p)}>Edit</button></div>)}</div>
      </section> : <form onSubmit={saveHomepage} style={styles.form}>
        <div style={styles.formTitle}>Tampilan awal website</div>
        <p style={styles.muted}>Semua field di bawah ini mengubah bagian depan website. Kamu tidak perlu edit file lagi.</p>
        <div style={styles.grid2}><Field label="Eyebrow hero" value={settings.heroEyebrow} onChange={v=>setSettings({...settings,heroEyebrow:v})}/><Field label="Nama brand" value={settings.siteName} onChange={v=>setSettings({...settings,siteName:v})}/><Field label="Judul hero" value={settings.heroTitle} onChange={v=>setSettings({...settings,heroTitle:v})}/><Field label="Aksen judul hero" value={settings.heroTitleAccent} onChange={v=>setSettings({...settings,heroTitleAccent:v})}/></div>
        <Field label="Deskripsi hero" value={settings.heroDescription} onChange={v=>setSettings({...settings,heroDescription:v})} textarea/>
        <div style={styles.grid2}><Field label="Teks tombol utama" value={settings.heroPrimaryText} onChange={v=>setSettings({...settings,heroPrimaryText:v})}/><Field label="Link tombol utama" value={settings.heroPrimaryUrl} onChange={v=>setSettings({...settings,heroPrimaryUrl:v})}/><Field label="Teks tombol kedua" value={settings.heroSecondaryText} onChange={v=>setSettings({...settings,heroSecondaryText:v})}/><Field label="Link tombol kedua" value={settings.heroSecondaryUrl} onChange={v=>setSettings({...settings,heroSecondaryUrl:v})}/></div>
        <div style={styles.grid2}><Field label="Judul collection" value={settings.collectionTitle} onChange={v=>setSettings({...settings,collectionTitle:v})}/><Field label="Eyebrow collection" value={settings.collectionEyebrow} onChange={v=>setSettings({...settings,collectionEyebrow:v})}/></div>
        <Field label="Deskripsi collection" value={settings.collectionDescription} onChange={v=>setSettings({...settings,collectionDescription:v})} textarea/>
        <label style={styles.label}>Produk unggulan <select style={styles.select} value={settings.featuredProductId} onChange={e=>setSettings({...settings,featuredProductId:e.target.value})}><option value="">Tidak ada</option>{products.filter(p=>p.status==="published").map(p=><option key={p.id} value={p.id}>{p.titleId}</option>)}</select></label>
        <div style={styles.notice}><label><input type="checkbox" checked={settings.announcementEnabled} onChange={e=>setSettings({...settings,announcementEnabled:e.target.checked})}/> Tampilkan announcement bar</label><Field label="Teks announcement" value={settings.announcementText} onChange={v=>setSettings({...settings,announcementText:v})}/></div>
        <div style={styles.checkRow}><label><input type="checkbox" checked={settings.showAbout} onChange={e=>setSettings({...settings,showAbout:e.target.checked})}/> About</label><label><input type="checkbox" checked={settings.showHowToOrder} onChange={e=>setSettings({...settings,showHowToOrder:e.target.checked})}/> How to Order</label><label><input type="checkbox" checked={settings.showContact} onChange={e=>setSettings({...settings,showContact:e.target.checked})}/> Contact</label></div>
        <div style={styles.grid3}><Field label="WhatsApp" value={settings.whatsappNumber} onChange={v=>setSettings({...settings,whatsappNumber:v})}/><Field label="Instagram" value={settings.instagramUrl} onChange={v=>setSettings({...settings,instagramUrl:v})}/><Field label="Email" value={settings.email} onChange={v=>setSettings({...settings,email:v})}/></div>
        <button style={styles.primary} disabled={busy}>{busy?"Menyimpan...":"Simpan tampilan"}</button>
        {message&&<div style={styles.success}>{message}</div>}
      </form>}
      {tab==="products"&&message&&<div style={styles.success}>{message}</div>}
    </div>
  </main>;
}

function Field({label,value,onChange,textarea=false,required=false,placeholder=""}:{label:string;value:string;onChange:(v:string)=>void;textarea?:boolean;required?:boolean;placeholder?:string}) {
  return <label style={styles.label}>{label}{textarea?<textarea required={required} style={{...styles.input,minHeight:110,resize:"vertical"}} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>:<input required={required} style={styles.input} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>}</label>;
}

const styles: Record<string, React.CSSProperties> = {
  page:{minHeight:"100vh",background:"#0b1420",color:"#f5edd6",fontFamily:"system-ui,sans-serif",padding:"40px 20px"},
  shell:{maxWidth:1100,margin:"0 auto"}, loginCard:{maxWidth:430,margin:"12vh auto",background:"#16243a",border:"1px solid rgba(200,165,86,.3)",padding:32,borderRadius:12},
  header:{display:"flex",justifyContent:"space-between",gap:20,alignItems:"flex-start",marginBottom:30},brand:{fontFamily:"Georgia,serif",fontSize:20,color:"#d9b866",letterSpacing:".12em"}, brandSpan:{}, tabs:{display:"flex",gap:8,borderBottom:"1px solid rgba(200,165,86,.2)",marginBottom:25},
  tab:{background:"transparent",border:0,color:"#9aa6b8",padding:"12px 18px",cursor:"pointer"},tabActive:{background:"rgba(200,165,86,.1)",border:0,borderBottom:"2px solid #c8a556",color:"#f5edd6",padding:"12px 18px",cursor:"pointer"},
  toolbar:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18},form:{background:"#16243a",border:"1px solid rgba(200,165,86,.18)",borderRadius:12,padding:24,display:"grid",gap:18},formTitle:{fontSize:20,fontWeight:700,color:"#d9b866"},grid2:{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:14},grid3:{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:14},grid4:{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:14},
  label:{display:"grid",gap:7,fontSize:12,color:"#b8c0cd"},input:{width:"100%",background:"#0d1b2a",color:"#f5edd6",border:"1px solid rgba(200,165,86,.22)",borderRadius:7,padding:"11px 12px",outline:"none",fontSize:14},select:{background:"#0d1b2a",color:"#f5edd6",border:"1px solid rgba(200,165,86,.22)",borderRadius:7,padding:"9px 12px",marginLeft:8},
  primary:{background:"linear-gradient(135deg,#9b7832,#d8b45e)",color:"#0d1b2a",border:0,borderRadius:7,padding:"12px 18px",fontWeight:700,cursor:"pointer"},ghost:{background:"transparent",color:"#d8b45e",border:"1px solid rgba(200,165,86,.35)",borderRadius:7,padding:"10px 15px",cursor:"pointer"},
  actions:{display:"flex",gap:10},checkRow:{display:"flex",gap:20,flexWrap:"wrap",alignItems:"center"},previewRow:{display:"flex",gap:10,flexWrap:"wrap",marginTop:10},preview:{width:90,height:110,objectFit:"cover",borderRadius:6,border:"1px solid rgba(200,165,86,.2)"},list:{display:"grid",gap:8,marginTop:18},row:{display:"flex",alignItems:"center",gap:14,background:"#16243a",padding:12,borderRadius:9,border:"1px solid rgba(200,165,86,.12)"},thumb:{width:58,height:72,objectFit:"cover",borderRadius:5},muted:{color:"#9aa6b8",fontSize:13,lineHeight:1.6},error:{marginTop:14,color:"#ff9b9b",fontSize:13},success:{marginTop:14,color:"#a9e6bb",fontSize:13},notice:{padding:16,border:"1px solid rgba(200,165,86,.2)",borderRadius:8,display:"grid",gap:12}
};
