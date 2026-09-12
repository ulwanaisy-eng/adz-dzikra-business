"use client";

import { FormEvent, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AdminLogin() {
  const [message, setMessage] = useState("");
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return setMessage("Sambungkan Supabase terlebih dahulu melalui file .env.local.");
    const data = new FormData(event.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({ email: String(data.get("email")), password: String(data.get("password")) });
    if (error) return setMessage(error.message);
    window.location.assign("/admin");
  }
  return <main className="admin login"><a href="/" className="back">← Kembali ke situs</a><p className="eyebrow">DZIKRA / ADMIN</p><h1>Masuk</h1><p className="admin-copy">Gunakan akun administrator Dzikra.</p><form onSubmit={login}><label>Email<input required name="email" type="email" autoComplete="email"/></label><label>Kata sandi<input required name="password" type="password" autoComplete="current-password"/></label><button className="save-book">Masuk</button>{message && <p className="draft-note">{message}</p>}</form></main>;
}
