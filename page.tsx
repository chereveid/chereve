"use client";

import React, { useState } from "react";
import BraceletStudio from "./BraceletStudio";

const TEXT = {
  en: {
    how: "How It Works",
    create: "Create Your Own 🎀",
    story: "Our Story",
    badge: "Custom Handmade Bracelet Studio",
    desc: "Your wrist, your rules! Mix and match all you like, as long as you follow the steps thoroughly!",
    palette: "Signature CHEREVE Palette",
    howTitle: "How Your Custom Bracelet Comes to Life",
    howSub: "Designed by you, handcrafted with love by us.",
    s1t: "Pick Your Style", s1d: "Choose pearls, pastel glass beads, or alphabet strands.",
    s2t: "Arrange Every Bead", s2d: "Add names, initials, and charms in your exact order.",
    s3t: "Preview in 3D", s3d: "Spin and inspect your bracelet live before ordering.",
    s4t: "Shopee Checkout", s4d: "Save your custom design and send it to CHEREVE's Shopee.",
    storyTitle: "Our Story",
    storyBody: "From a small idea to our favorite creative adventure! Now we're sharing adorable, custom-made bracelets designed by you and handmade by us. We hope you'll be a part of our journey!",
  },
  id: {
    how: "Cara Pesan",
    create: "Buat Gelangmu 🎀",
    story: "Cerita Kami",
    badge: "Studio Gelang Custom Handmade",
    desc: "Pergelangan tanganmu, aturanmu! Bebas mix and match sesukamu, asal ikuti langkah-langkahnya dengan teliti ya!",
    palette: "Palet Warna Khas CHEREVE",
    howTitle: "Cara Gelang Custom-mu Dibuat",
    howSub: "Didesain olehmu, dirangkai penuh cinta oleh kami.",
    s1t: "Pilih Modelmu", s1d: "Pilih mutiara, manik kaca pastel, atau rangkaian huruf.",
    s2t: "Susun Setiap Manik", s2d: "Tambahkan nama, inisial, dan charm sesuai urutanmu.",
    s3t: "Lihat Preview 3D", s3d: "Putar dan cek detail gelangmu secara langsung sebelum pesan.",
    s4t: "Checkout di Shopee", s4d: "Simpan desain custom-mu dan kirim ke Shopee CHEREVE.",
    storyTitle: "Cerita Kami",
    storyBody: "Dari ide kecil hingga menjadi petualangan kreatif favorit kami! Kini kami menghadirkan gelang custom gemas yang didesain olehmu dan dibuat handmade oleh kami. Semoga kamu bisa jadi bagian dari perjalanan kami ya!",
  },
};

export default function Home() {
  const [lang, setLang] = useState<"en" | "id">("en");
  const t = TEXT[lang];

  return (
    <div
      className="min-h-screen bg-[#FFFDF9] text-stone-800 font-sans selection:bg-pink-200 scroll-smooth"
      style={{
        backgroundImage: "radial-gradient(rgba(28,25,23,0.12) 2.5px, transparent 2.5px), radial-gradient(rgba(28,25,23,0.12) 2.5px, transparent 2.5px)",
        backgroundSize: "48px 48px",
        backgroundPosition: "0 0, 24px 24px",
      }}
    >
      <nav className="sticky top-0 z-50 bg-[#FFFDF9]/85 backdrop-blur-md border-b border-pink-100 px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 max-w-6xl mx-auto">
        <a href="#" className="flex flex-col items-start text-left leading-none">
          <span className="text-2xl font-serif font-bold tracking-[0.25em] text-stone-800">CHEREVE</span>
          <span className="text-[10px] tracking-[0.3em] text-stone-400 mt-1">by C &amp; R</span>
        </a>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <a href="#how-it-works" className="bg-white/80 hover:bg-purple-100/70 border border-pink-100 text-stone-700 font-medium text-xs sm:text-sm px-3.5 py-2 rounded-full transition">{t.how}</a>
          <a href="#studio" className="bg-pink-300 hover:bg-pink-400 text-stone-900 font-medium text-xs sm:text-sm px-4 py-2 rounded-full shadow-sm transition">{t.create}</a>
          <a href="#story" className="bg-white/80 hover:bg-[#C8F2D6]/60 border border-pink-100 text-stone-700 font-medium text-xs sm:text-sm px-3.5 py-2 rounded-full transition">{t.story}</a>
          <div className="flex items-center bg-white/90 border border-pink-200 rounded-full p-0.5 text-xs font-semibold shadow-sm">
            <button type="button" onClick={() => setLang("en")} className={`px-2.5 py-1 rounded-full transition ${lang === "en" ? "bg-stone-800 text-white" : "text-stone-500"}`}>EN</button>
            <button type="button" onClick={() => setLang("id")} className={`px-2.5 py-1 rounded-full transition ${lang === "id" ? "bg-pink-400 text-white" : "text-stone-500"}`}>ID</button>
          </div>
        </div>
      </nav>

      <header className="px-6 pt-14 pb-20 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-purple-100/80 text-purple-800 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
          <span>{t.badge}</span>
        </div>
        <h1 className="text-5xl sm:text-7xl font-serif font-bold tracking-[0.18em] text-stone-800 mb-4">CHEREVE</h1>
        <p className="text-lg sm:text-2xl italic font-serif text-pink-500 mb-6">adorable beads from us 2 u !</p>
        <p className="max-w-xl mx-auto text-stone-600 text-base sm:text-lg leading-relaxed mb-10">{t.desc}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#how-it-works" className="w-full sm:w-auto bg-white/90 border border-pink-200 hover:bg-pink-50 text-stone-700 font-medium px-8 py-4 rounded-full transition text-sm">{t.how}</a>
          <a href="#studio" className="w-full sm:w-auto bg-gradient-to-r from-pink-300 via-purple-200 to-sky-200 hover:opacity-90 text-stone-900 font-semibold px-8 py-4 rounded-full shadow-md transition text-sm">{t.create.replace(" 🎀", "")}</a>
          <a href="#story" className="w-full sm:w-auto bg-white/90 border border-pink-200 hover:bg-[#C8F2D6]/40 text-stone-700 font-medium px-8 py-4 rounded-full transition text-sm">{t.story}</a>
        </div>
        <div className="mt-14 flex justify-center items-center gap-3 text-xs text-stone-500">
          <span className="w-5 h-5 rounded-full bg-[#F9C6D4] border border-white shadow" />
          <span className="w-5 h-5 rounded-full bg-[#DCC6F8] border border-white shadow" />
          <span className="w-5 h-5 rounded-full bg-[#C8F2D6] border border-white shadow" />
          <span className="w-5 h-5 rounded-full bg-[#C3E5FA] border border-white shadow" />
          <span className="ml-2">{t.palette}</span>
        </div>
      </header>

      <section id="how-it-works" className="px-6 py-16 bg-white/60 backdrop-blur-[2px] border-y border-pink-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center font-serif text-3xl font-bold text-stone-800 mb-3">{t.howTitle}</h2>
          <p className="text-center text-stone-500 text-sm mb-12">{t.howSub}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#F9C6D4]/35 rounded-3xl p-6 border border-white shadow-sm"><span className="text-xs font-bold tracking-widest text-stone-400">01</span><h3 className="font-serif text-xl font-bold text-stone-800 mt-2 mb-2">{t.s1t}</h3><p className="text-sm text-stone-600">{t.s1d}</p></div>
            <div className="bg-[#DCC6F8]/35 rounded-3xl p-6 border border-white shadow-sm"><span className="text-xs font-bold tracking-widest text-stone-400">02</span><h3 className="font-serif text-xl font-bold text-stone-800 mt-2 mb-2">{t.s2t}</h3><p className="text-sm text-stone-600">{t.s2d}</p></div>
            <div className="bg-[#C8F2D6]/40 rounded-3xl p-6 border border-white shadow-sm"><span className="text-xs font-bold tracking-widest text-stone-400">03</span><h3 className="font-serif text-xl font-bold text-stone-800 mt-2 mb-2">{t.s3t}</h3><p className="text-sm text-stone-600">{t.s3d}</p></div>
            <div className="bg-[#C3E5FA]/35 rounded-3xl p-6 border border-white shadow-sm"><span className="text-xs font-bold tracking-widest text-stone-400">04</span><h3 className="font-serif text-xl font-bold text-stone-800 mt-2 mb-2">{t.s4t}</h3><p className="text-sm text-stone-600">{t.s4d}</p></div>
          </div>
        </div>
      </section>

      <BraceletStudio lang={lang} />

      <section id="story" className="px-6 py-16 bg-[#C8F2D6]/25 backdrop-blur-[2px] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-stone-800 mb-4">{t.storyTitle}</h2>
          <p className="text-stone-600 leading-relaxed text-sm sm:text-base mb-8">{t.storyBody}</p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white/90 hover:bg-pink-100/80 border border-pink-200 text-stone-700 font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-sm transition">Instagram • @chereve.co</a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="bg-white/90 hover:bg-purple-100/80 border border-pink-200 text-stone-700 font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-sm transition">X • @chereveid</a>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-stone-400 border-t border-pink-100 bg-[#FFFDF9]/80 space-y-2">
        <div className="flex justify-center gap-4 text-stone-500 font-medium">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">Instagram (@chereve.co)</a>
          <span>•</span>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">X (@chereveid)</a>
        </div>
        <p>© 2026 CHEREVE • adorable beads from us 2 u ! 🎀</p>
      </footer>
    </div>
  );
}
