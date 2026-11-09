"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type BeadCategory = "pearls" | "black" | "ombre" | "rainbow" | "cateye" | "shapes" | "letter";

export type CatalogItem = {
  label: string;
  color: string;
  color2?: string;
  category: BeadCategory;
  mm: 4 | 6 | 8 | 10;
  shape?: "round" | "heart" | "flower" | "daisy" | "butterfly" | "star" | "cube";
};

export type BeadItem = CatalogItem & { id: string };

const CATALOG: CatalogItem[] = [
  // 1. Pearls (6mm & 4mm)
  { label: "Silver Pearl (6mm)", color: "#D4D4D8", category: "pearls", mm: 6, shape: "round" },
  { label: "White Pearl (6mm)", color: "#FFFDF9", category: "pearls", mm: 6, shape: "round" },
  { label: "White Pearl (4mm)", color: "#FFFDF9", category: "pearls", mm: 4, shape: "round" },
  { label: "Lilac Pearl (6mm)", color: "#D8B4FE", category: "pearls", mm: 6, shape: "round" },
  { label: "Purple Pearl (6mm)", color: "#9333EA", category: "pearls", mm: 6, shape: "round" },
  { label: "Greyish-Purple Pearl (6mm)", color: "#94A3B8", category: "pearls", mm: 6, shape: "round" },
  { label: "Dark Turquoise Pearl (6mm)", color: "#0D9488", category: "pearls", mm: 6, shape: "round" },
  { label: "Light Blue Pearl (6mm)", color: "#7DD3FC", category: "pearls", mm: 6, shape: "round" },
  { label: "Light Pink Pearl (6mm)", color: "#FBCFE8", category: "pearls", mm: 6, shape: "round" },
  { label: "Pink Jambu Pearl (6mm)", color: "#FB7185", category: "pearls", mm: 6, shape: "round" },
  { label: "Dark Red Pearl (6mm)", color: "#881337", category: "pearls", mm: 6, shape: "round" },

  // 2. Black Beads (6mm & 4mm)
  { label: "Black Bead (6mm)", color: "#18181B", category: "black", mm: 6, shape: "round" },
  { label: "Black Bead (4mm)", color: "#18181B", category: "black", mm: 4, shape: "round" },

  // 3. Pastel Ombré (6mm)
  { label: "Purple-Blue Ombré", color: "#C4B5FD", color2: "#7DD3FC", category: "ombre", mm: 6, shape: "round" },
  { label: "Mint Green Ombré", color: "#6EE7B7", color2: "#ECFDF5", category: "ombre", mm: 6, shape: "round" },
  { label: "Baby Blue & White Ombré", color: "#7DD3FC", color2: "#FFFFFF", category: "ombre", mm: 6, shape: "round" },
  { label: "Baby Pink & White Ombré", color: "#F9A8D4", color2: "#FFFFFF", category: "ombre", mm: 6, shape: "round" },

  // 4. Clear Rainbow Acrylic (6mm & 8mm)
  { label: "Clear Rainbow (8mm)", color: "#E0F2FE", color2: "#FCE7F3", category: "rainbow", mm: 8, shape: "round" },
  { label: "Rainbow Pink (6mm)", color: "#F9A8D4", color2: "#FEF08A", category: "rainbow", mm: 6, shape: "round" },
  { label: "Rainbow Pink (8mm)", color: "#F9A8D4", color2: "#FEF08A", category: "rainbow", mm: 8, shape: "round" },
  { label: "Rainbow Blue (6mm)", color: "#7DD3FC", color2: "#E9D5FF", category: "rainbow", mm: 6, shape: "round" },
  { label: "Rainbow Blue (8mm)", color: "#7DD3FC", color2: "#E9D5FF", category: "rainbow", mm: 8, shape: "round" },
  { label: "Rainbow Purple (6mm)", color: "#C084FC", color2: "#BAE6FD", category: "rainbow", mm: 6, shape: "round" },

  // 5. Cat's Eye (10mm)
  { label: "Cat's Eye Lilac (10mm)", color: "#C4B5FD", category: "cateye", mm: 10, shape: "round" },
  { label: "Cat's Eye Dusty Rose (10mm)", color: "#F472B6", category: "cateye", mm: 10, shape: "round" },
  { label: "Cat's Eye Baby Blue (10mm)", color: "#7DD3FC", category: "cateye", mm: 10, shape: "round" },
  { label: "Cat's Eye Milky White (10mm)", color: "#E2E8F0", category: "cateye", mm: 10, shape: "round" },
  { label: "Cat's Eye Dark Red (10mm)", color: "#881337", category: "cateye", mm: 10, shape: "round" },

  // 6. Shaped Beads & Charms
  { label: "Cream Pearl Heart", color: "#FEF9EE", category: "shapes", mm: 8, shape: "heart" },
  { label: "Cream Pearl Flower", color: "#FEF9EE", category: "shapes", mm: 8, shape: "flower" },
  { label: "White Daisy Flower", color: "#FFFFFF", category: "shapes", mm: 8, shape: "daisy" },
  { label: "Pink Iridescent Butterfly", color: "#F9A8D4", category: "shapes", mm: 10, shape: "butterfly" },
  { label: "Blue Iridescent Butterfly", color: "#93C5FD", category: "shapes", mm: 10, shape: "butterfly" },
  { label: "Clear Iridescent Butterfly", color: "#E2E8F0", category: "shapes", mm: 10, shape: "butterfly" },
  { label: "Purple Iridescent Star", color: "#C084FC", category: "shapes", mm: 8, shape: "star" },
  { label: "Blue Iridescent Star", color: "#7DD3FC", category: "shapes", mm: 8, shape: "star" },
  { label: "Clear Iridescent Star", color: "#E2E8F0", category: "shapes", mm: 8, shape: "star" },
];

const INITIAL_BEADS: BeadItem[] = [
  { id: "1", label: "Light Pink Pearl (6mm)", color: "#FBCFE8", category: "pearls", mm: 6, shape: "round" },
  { id: "2", label: "Cat's Eye Lilac (10mm)", color: "#C4B5FD", category: "cateye", mm: 10, shape: "round" },
  { id: "3", label: "Cream Pearl Flower", color: "#FEF9EE", category: "shapes", mm: 8, shape: "flower" },
  { id: "4", label: "Pink Iridescent Butterfly", color: "#F9A8D4", category: "shapes", mm: 10, shape: "butterfly" },
  { id: "5", label: "Purple-Blue Ombré", color: "#C4B5FD", color2: "#7DD3FC", category: "ombre", mm: 6, shape: "round" },
  { id: "6", label: "Rainbow Blue (8mm)", color: "#7DD3FC", color2: "#E9D5FF", category: "rainbow", mm: 8, shape: "round" },
  { id: "7", label: "White Pearl (4mm)", color: "#FFFDF9", category: "pearls", mm: 4, shape: "round" },
];
function makeLetterTexture(letter: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#FFFDF9";
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = "#F9C6D4";
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 120, 120);
  ctx.fillStyle = "#292524";
  ctx.font = "bold 72px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(letter, 64, 68);
  return new THREE.CanvasTexture(canvas);
}

function makeSpecialTexture(b: BeadItem): THREE.CanvasTexture | null {
  if (b.category !== "ombre" && b.category !== "cateye" && b.category !== "rainbow") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;

  if (b.category === "ombre") {
    const grad = ctx.createLinearGradient(0, 0, 128, 128);
    grad.addColorStop(0, b.color);
    grad.addColorStop(1, b.color2 || "#FFFFFF");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  } else if (b.category === "cateye") {
    ctx.fillStyle = b.color;
    ctx.fillRect(0, 0, 128, 128);
    const band = ctx.createLinearGradient(44, 0, 84, 0);
    band.addColorStop(0, "rgba(255,255,255,0)");
    band.addColorStop(0.5, "rgba(255,255,255,0.85)");
    band.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = band;
    ctx.fillRect(44, 0, 40, 128);
  } else if (b.category === "rainbow") {
    const grad = ctx.createLinearGradient(0, 0, 128, 128);
    grad.addColorStop(0, b.color);
    grad.addColorStop(0.5, b.color2 || "#FEF08A");
    grad.addColorStop(1, "#BAE6FD");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }
  return new THREE.CanvasTexture(canvas);
}

function buildBeadMesh(b: BeadItem): THREE.Object3D {
  const scale = b.mm === 4 ? 0.13 : b.mm === 6 ? 0.19 : b.mm === 8 ? 0.24 : 0.29;

  if (b.category === "letter") {
    return new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.28, 0.28),
      new THREE.MeshStandardMaterial({ map: makeLetterTexture(b.label), roughness: 0.3 })
    );
  }

  const tex = makeSpecialTexture(b);
  const mat = new THREE.MeshPhysicalMaterial({
    color: tex ? "#FFFFFF" : b.color,
    map: tex,
    roughness: b.category === "black" ? 0.08 : b.category === "rainbow" ? 0.06 : b.category === "cateye" ? 0.14 : 0.18,
    metalness: b.category === "pearls" ? 0.28 : 0.05,
    transparent: b.category === "rainbow",
    opacity: b.category === "rainbow" ? 0.72 : 1,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
  });

  if (b.shape === "heart") {
    const s = new THREE.Shape();
    s.moveTo(0, 0.12);
    s.bezierCurveTo(0, 0.22, -0.22, 0.22, -0.22, 0.05);
    s.bezierCurveTo(-0.22, -0.1, 0, -0.22, 0, -0.28);
    s.bezierCurveTo(0, -0.22, 0.22, -0.1, 0.22, 0.05);
    s.bezierCurveTo(0.22, 0.22, 0, 0.22, 0, 0.12);
    const geo = new THREE.ExtrudeGeometry(s, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03 });
    geo.center();
    return new THREE.Mesh(geo, mat);
  }

  if (b.shape === "star") {
    const s = new THREE.Shape();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? 0.26 : 0.11;
      const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
      if (i === 0) s.moveTo(Math.cos(a) * r, Math.sin(a) * r);
      else s.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    s.closePath();
    const geo = new THREE.ExtrudeGeometry(s, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.02 });
    geo.center();
    return new THREE.Mesh(geo, mat);
  }

  if (b.shape === "butterfly") {
    const g = new THREE.Group();
    const wingGeo = new THREE.SphereGeometry(0.15, 16, 16);
    [[-0.13, 0.09], [0.13, 0.09], [-0.1, -0.09], [0.1, -0.09]].forEach(([wx, wy], idx) => {
      const w = new THREE.Mesh(wingGeo, mat);
      w.position.set(wx, wy, 0);
      w.scale.set(idx < 2 ? 1.15 : 0.85, idx < 2 ? 1.05 : 0.8, 0.45);
      g.add(w);
    });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.03, 0.18, 6, 10), new THREE.MeshStandardMaterial({ color: "#FEF3C7", metalness: 0.3 }));
    g.add(body);
    return g;
  }

  if (b.shape === "flower" || b.shape === "daisy") {
    const g = new THREE.Group();
    const petals = b.shape === "daisy" ? 7 : 5;
    const petalGeo = new THREE.SphereGeometry(b.shape === "daisy" ? 0.075 : 0.095, 14, 14);
    for (let p = 0; p < petals; p++) {
      const a = (p / petals) * Math.PI * 2;
      const petal = new THREE.Mesh(petalGeo, mat);
      petal.position.set(Math.cos(a) * 0.14, Math.sin(a) * 0.14, 0);
      petal.scale.z = 0.55;
      g.add(petal);
    }
    const centerMat = new THREE.MeshStandardMaterial({ color: b.shape === "daisy" ? "#FACC15" : "#FDE68A", roughness: 0.3 });
    const center = new THREE.Mesh(new THREE.SphereGeometry(0.08, 14, 14), centerMat);
    g.add(center);
    return g;
  }

  return new THREE.Mesh(new THREE.SphereGeometry(scale, 28, 28), mat);
}

export default function BraceletStudio({ lang }: { lang: "en" | "id" }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [beads, setBeads] = useState<BeadItem[]>(INITIAL_BEADS);
  const [tab, setTab] = useState<BeadCategory>("pearls");
  const [word, setWord] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 2.3, 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.innerHTML = "";
    el.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    const dir = new THREE.DirectionalLight(0xffffff, 2);
    dir.position.set(4, 6, 5);
    scene.add(dir);

    const group = new THREE.Group();
    scene.add(group);

    const radius = 1.75;
    const silverMat = new THREE.MeshStandardMaterial({ color: "#d4d4d8", metalness: 0.85, roughness: 0.2 });

    const wire = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.018, 10, 80), silverMat);
    wire.rotation.x = Math.PI / 2;
    group.add(wire);

    const startAngle = -Math.PI * 0.68;
    const endAngle = Math.PI * 0.68;
    const span = endAngle - startAngle;

    [startAngle - 0.08, endAngle + 0.08].forEach((a) => {
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 16), silverMat);
      cap.position.set(Math.sin(a) * radius, 0, Math.cos(a) * radius);
      group.add(cap);
    });

    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const a = endAngle + 0.14 + t * (Math.PI * 2 - span - 0.28);
      const link = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.018, 8, 16), silverMat);
      link.position.set(Math.sin(a) * radius, 0, Math.cos(a) * radius);
      link.rotation.y = a;
      link.rotation.x = i % 2 === 0 ? 0.35 : -0.35;
      group.add(link);
    }

    const claspAngle = startAngle - 0.16;
    const jumpRing = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.02, 10, 24), silverMat);
    jumpRing.position.set(Math.sin(claspAngle) * radius, 0, Math.cos(claspAngle) * radius);
    jumpRing.rotation.x = Math.PI / 2;
    group.add(jumpRing);

    for (let d = 1; d <= 5; d++) {
      const tailLink = new THREE.Mesh(new THREE.TorusGeometry(0.065, 0.015, 8, 14), silverMat);
      tailLink.position.set(
        Math.sin(claspAngle) * (radius + d * 0.11),
        -d * 0.05,
        Math.cos(claspAngle) * (radius + d * 0.11)
      );
      tailLink.rotation.y = claspAngle + (d % 2 === 0 ? 0.5 : -0.5);
      group.add(tailLink);
    }

    beads.forEach((b, i) => {
      const ratio = beads.length === 1 ? 0.5 : i / (beads.length - 1);
      const angle = startAngle + ratio * span;
      const obj = buildBeadMesh(b);
      obj.position.set(Math.sin(angle) * radius, 0, Math.cos(angle) * radius);
      obj.lookAt(0, 0, 0);
      group.add(obj);
    });
    let dragging = false;
    let prevX = 0;
    let prevY = 0;
    const onDown = (e: PointerEvent) => { dragging = true; prevX = e.clientX; prevY = e.clientY; };
    const onUp = () => { dragging = false; };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      group.rotation.y += (e.clientX - prevX) * 0.012;
      group.rotation.x = Math.max(-0.8, Math.min(0.8, group.rotation.x + (e.clientY - prevY) * 0.01));
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const dom = renderer.domElement;
    dom.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove);

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!dragging) group.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      dom.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, [beads]);

  const addBead = (item: CatalogItem) => {
    if (beads.length >= 24) return;
    setBeads([...beads, { ...item, id: `${Date.now()}-${Math.random()}` }]);
  };

  const addLetters = () => {
    const clean = word.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 12);
    if (!clean) return;
    const newLetters: BeadItem[] = clean.split("").map((ch, idx) => ({
      id: `${Date.now()}-${idx}-${Math.random()}`,
      label: ch,
      color: "#FFFDF9",
      category: "letter",
      mm: 6,
      shape: "cube",
    }));
    setBeads([...beads, ...newLetters].slice(0, 24));
    setWord("");
  };

  const moveBead = (index: number, dir: -1 | 1) => {
    const next = index + dir;
    if (next < 0 || next >= beads.length) return;
    const copy = [...beads];
    [copy[index], copy[next]] = [copy[next], copy[index]];
    setBeads(copy);
  };

  const removeBead = (index: number) => {
    setBeads(beads.filter((_, i) => i !== index));
  };

  const tabs: { id: BeadCategory; en: string; idLabel: string }[] = [
    { id: "pearls", en: "Pearls", idLabel: "Mutiara" },
    { id: "black", en: "Black", idLabel: "Hitam" },
    { id: "ombre", en: "Pastel Ombré", idLabel: "Ombré Pastel" },
    { id: "rainbow", en: "Clear Rainbow", idLabel: "Pelangi Bening" },
    { id: "cateye", en: "Cat's Eye 10mm", idLabel: "Cat's Eye 10mm" },
    { id: "shapes", en: "Shapes & Charms", idLabel: "Bentuk & Charm" },
  ];

  const orderSummary = `🎀 CHEREVE Custom Bracelet Order 🎀\nBeads (${beads.length}): ${beads.map((b) => b.label).join(" - ")}\nTotal: Rp 15.000`;

  const copyOrder = () => {
    navigator.clipboard.writeText(orderSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <section id="studio" className="px-4 sm:px-6 py-16 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <span className="inline-block bg-pink-100 text-pink-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
          {lang === "en" ? "Interactive 3D Studio" : "Studio Interaktif 3D"}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800">
          {lang === "en" ? "Create Your Own Bracelet" : "Rangkai Gelang Custom-mu"}
        </h2>
        <p className="text-sm text-stone-500 mt-2">
          {lang === "en" ? "Drag to spin! All custom bracelets are Rp 15.000." : "Geser untuk memutar! Semua gelang custom Rp 15.000."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white/85 backdrop-blur-sm border border-pink-100 rounded-3xl p-5 shadow-sm">
          <div ref={mountRef} className="w-full h-72 sm:h-80 rounded-2xl bg-gradient-to-b from-pink-50/70 via-purple-50/50 to-sky-50/70 cursor-grab active:cursor-grabbing" />
          <div className="flex items-center justify-between mt-4 text-xs text-stone-500">
            <span>{beads.length} / 24 {lang === "en" ? "beads" : "manik"}</span>
            <button type="button" onClick={() => setBeads([])} className="text-rose-500 hover:underline font-medium">
              {lang === "en" ? "Clear All" : "Hapus Semua"}
            </button>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-stone-600 mb-2">
              {lang === "en" ? "Your Bead Order (tap arrows to rearrange):" : "Urutan Manikmu (klik panah untuk geser):"}
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-stone-50/80 rounded-2xl border border-pink-100">
              {beads.length === 0 && (
                <span className="text-xs text-stone-400 py-2 px-1">
                  {lang === "en" ? "No beads yet—pick some on the right!" : "Belum ada manik—pilih di sebelah kanan!"}
                </span>
              )}
              {beads.map((b, idx) => (
                <div key={b.id} className="flex items-center gap-1 bg-white border border-pink-100 rounded-full px-2.5 py-1 text-xs shadow-2xs">
                  <span className="w-2.5 h-2.5 rounded-full border border-stone-200" style={{ backgroundColor: b.color }} />
                  <span className="font-medium text-stone-700">{b.label}</span>
                  <button type="button" onClick={() => moveBead(idx, -1)} className="text-stone-400 hover:text-stone-700 px-0.5">‹</button>
                  <button type="button" onClick={() => moveBead(idx, 1)} className="text-stone-400 hover:text-stone-700 px-0.5">›</button>
                  <button type="button" onClick={() => removeBead(idx)} className="text-rose-400 hover:text-rose-600 pl-0.5">×</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/85 backdrop-blur-sm border border-pink-100 rounded-3xl p-6 shadow-sm space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              {lang === "en" ? "1. Pick Beads & Charms" : "1. Pilih Manik & Charm"}
            </label>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tabs.map((tb) => (
                <button key={tb.id} type="button" onClick={() => setTab(tb.id)} className={`px-3 py-1 rounded-full text-xs font-medium transition ${tab === tb.id ? "bg-pink-300 text-stone-900 font-semibold" : "bg-pink-50/70 text-stone-600 hover:bg-pink-100"}`}>
                  {lang === "en" ? tb.en : tb.idLabel}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-52 overflow-y-auto pr-1">
              {CATALOG.filter((item) => item.category === tab).map((item) => (
                <button key={item.label} type="button" onClick={() => addBead(item)} className="flex items-center gap-2 bg-white hover:bg-pink-50/80 border border-pink-100 rounded-2xl p-2.5 text-left transition shadow-2xs">
                  <span className="w-5 h-5 rounded-full shrink-0 border border-stone-200 shadow-inner" style={{ background: item.color2 ? `linear-gradient(135deg, ${item.color}, ${item.color2})` : item.color }} />
                  <span className="text-xs font-medium text-stone-800 leading-tight">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              {lang === "en" ? "2. Add Name / Letters" : "2. Tambah Nama / Huruf"}
            </label>
            <div className="flex gap-2">
              <input type="text" value={word} onChange={(e) => setWord(e.target.value)} placeholder={lang === "en" ? "Type name (e.g. CHEREVE)" : "Ketik nama (cth: CHEREVE)"} maxLength={12} className="flex-1 bg-white border border-pink-200 rounded-full px-4 py-2 text-sm text-stone-800 focus:outline-none focus:border-pink-400" />
              <button type="button" onClick={addLetters} className="bg-purple-200 hover:bg-purple-300 text-stone-900 font-semibold text-xs px-5 py-2 rounded-full transition">
                {lang === "en" ? "Add Letters" : "Tambah"}
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-pink-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-500">{lang === "en" ? "Total Price (All Custom)" : "Harga Total (Semua Custom)"}</span>
              <span className="text-2xl font-serif font-bold text-stone-800">Rp 15.000</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button type="button" onClick={copyOrder} className="flex-1 bg-stone-800 hover:bg-stone-700 text-white font-medium text-xs sm:text-sm py-3.5 px-4 rounded-full transition">
                {copied ? (lang === "en" ? "Copied! Now paste in Shopee Chat 🎀" : "Tersalin! Tempel di Chat Shopee 🎀") : (lang === "en" ? "1. Save & Copy Custom Design" : "1. Simpan & Salin Desain")}
              </button>
              <a href="https://shopee.co.id" target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-gradient-to-r from-pink-300 via-purple-200 to-sky-200 hover:opacity-90 text-stone-900 font-semibold text-xs sm:text-sm py-3.5 px-4 rounded-full shadow-sm transition">
                {lang === "en" ? "2. Checkout on Shopee ↗" : "2. Checkout di Shopee ↗"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
