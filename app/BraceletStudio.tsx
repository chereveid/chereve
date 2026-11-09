"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type BeadCategory = "pearls" | "black" | "ombre" | "rainbow" | "cateye" | "shapes" | "letter";

export type CatalogItem = {
  label: string;
  color: string;
  color2?: string;
  letterStyle?: string;
  category: BeadCategory;
  mm: 4 | 6 | 8 | 10;
  shape?: "round" | "heart" | "flower" | "daisy" | "butterfly" | "star" | "coin";
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

const LETTER_STYLES = [
  { id: "white-black", en: "White (Black Letter)", idLabel: "Putih (Huruf Hitam)", bg: "#FFFFFF", fg: "#18181B" },
  { id: "white-color", en: "White (Colorful)", idLabel: "Putih (Huruf Warna)", bg: "#FFFFFF", fg: "colorful" },
  { id: "black-white", en: "Black (White Letter)", idLabel: "Hitam (Huruf Putih)", bg: "#18181B", fg: "#FFFFFF" },
  { id: "jelly", en: "Clear Jelly", idLabel: "Bening Jelly", bg: "jelly", fg: "#FFFFFF" },
];

const JELLY_TINTS = [
  { id: "pink", en: "Pink", idLabel: "Pink", hex: "#F472B6" },
  { id: "purple", en: "Purple", idLabel: "Ungu", hex: "#A855F7" },
  { id: "blue", en: "Blue", idLabel: "Biru", hex: "#38BDF8" },
  { id: "green", en: "Green", idLabel: "Hijau", hex: "#4ADE80" },
  { id: "orange", en: "Orange", idLabel: "Oranye", hex: "#FB923C" },
  { id: "clear", en: "Clear", idLabel: "Bening", hex: "#E2E8F0" },
];

const COLORFUL_INKS = ["#EC4899", "#8B5CF6", "#0EA5E9", "#10B981", "#F59E0B"];

const INITIAL_BEADS: BeadItem[] = [
  { id: "1", label: "Light Pink Pearl (6mm)", color: "#FBCFE8", category: "pearls", mm: 6, shape: "round" },
  { id: "2", label: "White Pearl (6mm)", color: "#FFFDF9", category: "pearls", mm: 6, shape: "round" },
  { id: "3", label: "Cream Pearl Flower", color: "#FEF9EE", category: "shapes", mm: 8, shape: "flower" },
  { id: "4", label: "Pink Iridescent Butterfly", color: "#F9A8D4", category: "shapes", mm: 10, shape: "butterfly" },
  { id: "5", label: "White Pearl (6mm)", color: "#FFFDF9", category: "pearls", mm: 6, shape: "round" },
  { id: "6", label: "Lilac Pearl (6mm)", color: "#D8B4FE", category: "pearls", mm: 6, shape: "round" },
  { id: "7", label: "Pink Jambu Pearl (6mm)", color: "#FB7185", category: "pearls", mm: 6, shape: "round" },
];
function getBeadWidth(b: BeadItem): number {
  if (b.category === "letter") return 0.3;
  if (b.shape === "butterfly") return 0.34;
  if (b.shape === "heart" || b.shape === "star" || b.shape === "flower" || b.shape === "daisy") return 0.3;
  return b.mm === 4 ? 0.22 : b.mm === 6 ? 0.31 : b.mm === 8 ? 0.39 : 0.47;
}

function makeLetterTexture(letter: string, bgColor: string, fgColor: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = fgColor;
  ctx.font = "bold 76px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(letter, 64, 68);
  return new THREE.CanvasTexture(canvas);
}

function makeSpecialTexture(b: BeadItem): THREE.CanvasTexture | null {
  if (b.category !== "ombre" && b.category !== "cateye" && b.category !== "rainbow" && b.category !== "pearls") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;

  if (b.category === "pearls") {
    const grad = ctx.createRadialGradient(44, 40, 8, 64, 64, 64);
    grad.addColorStop(0, "#FFFFFF");
    grad.addColorStop(0.35, b.color);
    grad.addColorStop(1, b.color);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  } else if (b.category === "ombre") {
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
    band.addColorStop(0.5, "rgba(255,255,255,0.9)");
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
  const scale = b.mm === 4 ? 0.11 : b.mm === 6 ? 0.155 : b.mm === 8 ? 0.195 : 0.235;

  if (b.category === "letter") {
    const tex = makeLetterTexture(b.label, b.color, b.color2 || "#18181B");
    const isJelly = b.letterStyle === "jelly";
    const sideMat = new THREE.MeshPhysicalMaterial({
      color: b.color,
      roughness: 0.15,
      clearcoat: 1,
      transparent: isJelly,
      opacity: isJelly ? 0.72 : 1,
    });
    const faceMat = new THREE.MeshPhysicalMaterial({
      map: tex,
      roughness: 0.15,
      clearcoat: 1,
      transparent: isJelly,
      opacity: isJelly ? 0.85 : 1,
    });
    const coin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.165, 0.165, 0.1, 28),
      [sideMat, faceMat, faceMat]
    );
    coin.rotation.x = Math.PI / 2;
    return coin;
  }

  const tex = makeSpecialTexture(b);
  const mat = new THREE.MeshPhysicalMaterial({
    color: tex ? "#FFFFFF" : b.color,
    map: tex,
    roughness: b.category === "pearls" ? 0.12 : b.category === "black" ? 0.06 : b.category === "rainbow" ? 0.05 : 0.14,
    metalness: b.category === "pearls" ? 0.15 : 0.04,
    transparent: b.category === "rainbow",
    opacity: b.category === "rainbow" ? 0.72 : 1,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    sheen: b.category === "pearls" ? 1 : 0,
    sheenRoughness: 0.25,
    sheenColor: new THREE.Color("#FFF1F2"),
  });

  if (b.shape === "heart") {
    const s = new THREE.Shape();
    s.moveTo(0, 0.1);
    s.bezierCurveTo(0, 0.19, -0.19, 0.19, -0.19, 0.04);
    s.bezierCurveTo(-0.19, -0.09, 0, -0.19, 0, -0.24);
    s.bezierCurveTo(0, -0.19, 0.19, -0.09, 0.19, 0.04);
    s.bezierCurveTo(0.19, 0.19, 0, 0.19, 0, 0.1);
    const geo = new THREE.ExtrudeGeometry(s, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.025 });
    geo.center();
    return new THREE.Mesh(geo, mat);
  }

  if (b.shape === "star") {
    const s = new THREE.Shape();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? 0.22 : 0.095;
      const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
      if (i === 0) s.moveTo(Math.cos(a) * r, Math.sin(a) * r);
      else s.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    s.closePath();
    const geo = new THREE.ExtrudeGeometry(s, { depth: 0.1, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.02 });
    geo.center();
    return new THREE.Mesh(geo, mat);
  }

  if (b.shape === "butterfly") {
    const g = new THREE.Group();
    const wingGeo = new THREE.SphereGeometry(0.13, 16, 16);
    [[-0.11, 0.08], [0.11, 0.08], [-0.085, -0.08], [0.085, -0.08]].forEach(([wx, wy], idx) => {
      const w = new THREE.Mesh(wingGeo, mat);
      w.position.set(wx, wy, 0);
      w.scale.set(idx < 2 ? 1.15 : 0.85, idx < 2 ? 1.05 : 0.8, 0.45);
      g.add(w);
    });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.025, 0.15, 6, 10), new THREE.MeshStandardMaterial({ color: "#FEF3C7", metalness: 0.3 }));
    g.add(body);
    return g;
  }

  if (b.shape === "flower" || b.shape === "daisy") {
    const g = new THREE.Group();
    const petals = b.shape === "daisy" ? 7 : 5;
    const petalGeo = new THREE.SphereGeometry(b.shape === "daisy" ? 0.065 : 0.08, 14, 14);
    for (let p = 0; p < petals; p++) {
      const a = (p / petals) * Math.PI * 2;
      const petal = new THREE.Mesh(petalGeo, mat);
      petal.position.set(Math.cos(a) * 0.12, Math.sin(a) * 0.12, 0);
      petal.scale.z = 0.55;
      g.add(petal);
    }
    const centerMat = new THREE.MeshStandardMaterial({ color: b.shape === "daisy" ? "#FACC15" : "#FDE68A", roughness: 0.25 });
    const center = new THREE.Mesh(new THREE.SphereGeometry(0.07, 14, 14), centerMat);
    g.add(center);
    return g;
  }

  return new THREE.Mesh(new THREE.SphereGeometry(scale, 32, 32), mat);
}
export default function BraceletStudio({ lang }: { lang: "en" | "id" }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [beads, setBeads] = useState<BeadItem[]>(INITIAL_BEADS);
  const [tab, setTab] = useState<BeadCategory>("pearls");
  const [letterStyle, setLetterStyle] = useState("white-black");
  const [jellyTint, setJellyTint] = useState("#F472B6");
  const [word, setWord] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 2.2, 5.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.innerHTML = "";
    el.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.4));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 7, 5);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xfce7f3, 1.2);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    const group = new THREE.Group();
    scene.add(group);

    const widths = beads.map(getBeadWidth);
    const totalBeadArc = widths.reduce((sum, w) => sum + w, 0);
    const chainGap = 0.85;
    const circumference = Math.max(totalBeadArc + chainGap, 3.2);
    const radius = circumference / (Math.PI * 2);

    const silverMat = new THREE.MeshStandardMaterial({ color: "#e4e4e7", metalness: 0.9, roughness: 0.15 });

    const wire = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.015, 10, 80), silverMat);
    wire.rotation.x = Math.PI / 2;
    group.add(wire);

    const beadAngleSpan = totalBeadArc / radius;
    const startAngle = -beadAngleSpan / 2;
    const endAngle = beadAngleSpan / 2;

    let cursor = startAngle;
    beads.forEach((b, i) => {
      const w = widths[i];
      const angle = cursor + (w / 2) / radius;
      cursor += w / radius;
      const obj = buildBeadMesh(b);
      obj.position.set(Math.sin(angle) * radius, 0, Math.cos(angle) * radius);
      obj.lookAt(0, 0, 0);
      group.add(obj);
    });

    [startAngle - 0.05 / radius, endAngle + 0.05 / radius].forEach((a) => {
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 16), silverMat);
      cap.position.set(Math.sin(a) * radius, 0, Math.cos(a) * radius);
      group.add(cap);
    });

    const backSpan = Math.PI * 2 - beadAngleSpan - 0.16 / radius;
    const linkCount = Math.max(4, Math.round((backSpan * radius) / 0.11));
    for (let i = 0; i <= linkCount; i++) {
      const a = endAngle + 0.08 / radius + (i / linkCount) * backSpan;
      const link = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.015, 8, 16), silverMat);
      link.position.set(Math.sin(a) * radius, 0, Math.cos(a) * radius);
      link.rotation.y = a;
      link.rotation.x = i % 2 === 0 ? 0.35 : -0.35;
      group.add(link);
    }

    const claspAngle = startAngle - 0.12 / radius;
    const jumpRing = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.018, 10, 24), silverMat);
    jumpRing.position.set(Math.sin(claspAngle) * radius, 0, Math.cos(claspAngle) * radius);
    jumpRing.rotation.x = Math.PI / 2;
    group.add(jumpRing);

    for (let d = 1; d <= 5; d++) {
      const tailLink = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.014, 8, 14), silverMat);
      tailLink.position.set(
        Math.sin(claspAngle) * (radius + d * 0.095),
        -d * 0.04,
        Math.cos(claspAngle) * (radius + d * 0.095)
      );
      tailLink.rotation.y = claspAngle + (d % 2 === 0 ? 0.5 : -0.5);
      group.add(tailLink);
    }

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
    if (beads.length >= 28) return;
    setBeads([...beads, { ...item, id: `${Date.now()}-${Math.random()}` }]);
  };

  const addLetters = () => {
    const clean = word.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 12);
    if (!clean) return;
    const styleObj = LETTER_STYLES.find((s) => s.id === letterStyle) || LETTER_STYLES[0];
    const newLetters: BeadItem[] = clean.split("").map((ch, idx) => {
      const bg = styleObj.bg === "jelly" ? jellyTint : styleObj.bg;
      const fg = styleObj.fg === "colorful" ? COLORFUL_INKS[idx % COLORFUL_INKS.length] : styleObj.fg;
      return {
        id: `${Date.now()}-${idx}-${Math.random()}`,
        label: ch,
        color: bg,
        color2: fg,
        letterStyle: styleObj.id,
        category: "letter",
        mm: 6,
        shape: "coin",
      };
    });
    setBeads([...beads, ...newLetters].slice(0, 28));
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

  const baseStyle = LETTER_STYLES.find((s) => s.id === letterStyle)?.en || "White (Black Letter)";
  const tintName = JELLY_TINTS.find((t) => t.hex === jellyTint)?.en || "Pink";
  const styleLabel = letterStyle === "jelly" ? `Clear Jelly (${tintName})` : baseStyle;
  const orderSummary = `🎀 CHEREVE Custom Bracelet Order 🎀\nBeads (${beads.length}): ${beads.map((b) => b.label).join(" - ")}\nLetter Bead Style: ${styleLabel}\nTotal: Rp 15.000`;

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
          <p className="mt-2.5 text-[11px] text-center text-stone-500 bg-pink-50/70 border border-pink-100 rounded-xl px-3 py-1.5">
            {lang === "en"
              ? " Note: The 3D preview is for layout & color visualization only, actual beads look even prettier in real life!"
              : " Catatan: Preview 3D hanya ilustrasi susunan & warna, manik aslinya jauh lebih cantik dan mengkilap!"}
          </p>
          <div className="flex items-center justify-between mt-4 text-xs text-stone-500">
            <span>{beads.length} / 28 {lang === "en" ? "beads" : "manik"}</span>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pt-1 pr-1">
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
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {LETTER_STYLES.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setLetterStyle(st.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition ${
                    letterStyle === st.id
                      ? "bg-purple-300 text-stone-900 border-purple-400 font-semibold"
                      : "bg-white text-stone-600 border-pink-100 hover:bg-pink-50"
                  }`}
                >
                  {lang === "en" ? st.en : st.idLabel}
                </button>
              ))}
            </div>
            {letterStyle === "jelly" && (
              <div className="flex flex-wrap items-center gap-1.5 mb-2.5 bg-pink-50/60 border border-pink-100 rounded-2xl px-3 py-2">
                <span className="text-[11px] font-medium text-stone-500 mr-1">
                  {lang === "en" ? "Jelly color:" : "Warna jelly:"}
                </span>
                {JELLY_TINTS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setJellyTint(t.hex)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] border transition ${
                      jellyTint === t.hex ? "bg-white border-stone-800 font-semibold shadow-2xs" : "bg-white/70 border-pink-100 text-stone-600"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full border border-stone-200" style={{ backgroundColor: t.hex }} />
                    <span>{lang === "en" ? t.en : t.idLabel}</span>
                  </button>
                ))}
              </div>
            )}
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
