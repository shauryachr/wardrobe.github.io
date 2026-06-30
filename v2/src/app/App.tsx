import { useState, useRef, useEffect } from "react";
import { Menu, X, Sparkles, Plus, ChevronRight, Download, Star, Zap, Camera, Palette, Wand2 } from "lucide-react";

const NAV_LINKS = ["Features", "Pricing", "Company", "Help"];

const STYLE_TAGS = [
  "Quiet Luxury", "Streetcore", "Old Money", "Dark Academia",
  "Cottage Core", "Y2K Revival", "Coastal Chic", "Minimalist",
];

const STEPS = [
  {
    num: "01",
    icon: Camera,
    title: "Upload Your Clothes",
    desc: "Photograph and upload your upperwear, lowerwear, and footwear. Our AI catalogues every piece with rich metadata — color, fabric, occasion, style.",
    accent: "#38bdf8",
    glow: "rgba(56,189,248,0.15)",
    tag: "Wardrobe Scan",
  },
  {
    num: "02",
    icon: Palette,
    title: "Choose Your Aesthetic",
    desc: "Select from 12 curated style aesthetics — Quiet Luxury, Streetcore, Cottage Core, Y2K Revival, and more. Or blend multiple styles.",
    accent: "#818cf8",
    glow: "rgba(129,140,248,0.15)",
    tag: "Style Profile",
  },
  {
    num: "03",
    icon: Wand2,
    title: "Get Your Outfit",
    desc: "Receive AI-curated outfit combinations from your wardrobe, ranked by aesthetic match, occasion suitability, and color harmony.",
    accent: "#34d399",
    glow: "rgba(52,211,153,0.15)",
    tag: "AI Curation",
  },
];

function Cloud({ w, opacity, style }: { w: number; opacity: number; style: React.CSSProperties }) {
  return (
    <div style={{ position: "absolute", opacity, pointerEvents: "none", zIndex: 0, ...style }}>
      <svg width={w} height={w * 0.55} viewBox="0 0 200 110" fill="none">
        <ellipse cx="100" cy="75" rx="90" ry="35" fill="white" />
        <ellipse cx="70" cy="65" rx="50" ry="38" fill="white" />
        <ellipse cx="130" cy="60" rx="45" ry="36" fill="white" />
        <ellipse cx="100" cy="52" rx="38" ry="32" fill="white" />
      </svg>
    </div>
  );
}

const CLOUDS = [
  { id: 1, top: "6%", left: "4%", w: 200, opacity: 0.88 },
  { id: 2, top: "10%", right: "6%", w: 240, opacity: 0.82 },
  { id: 3, top: "32%", left: "1%", w: 150, opacity: 0.65 },
  { id: 4, top: "16%", left: "40%", w: 170, opacity: 0.55 },
  { id: 5, top: "4%", left: "62%", w: 140, opacity: 0.72 },
  { id: 6, bottom: "24%", left: "7%", w: 120, opacity: 0.48 },
  { id: 7, bottom: "18%", right: "4%", w: 160, opacity: 0.58 },
];

// 3D card wrapper with tilt on hover
function Card3D({ children, className, style, delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `rotateY(${dx * 14}deg) rotateX(${-dy * 14}deg) scale(1.04) translateZ(20px)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.25s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.25s ease",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function UpperWearCard() {
  return (
    <Card3D
      className="absolute left-[2%] top-[20%] w-56 z-10"
      style={{ animation: `floatA 6s ${0}s ease-in-out infinite`, filter: "drop-shadow(0 24px 48px rgba(3,105,161,0.22))" }}
    >
      <div
        className="bg-white/90 rounded-3xl p-4 border border-white"
        style={{ backdropFilter: "blur(12px)", boxShadow: "0 8px 40px rgba(3,105,161,0.12), inset 0 1px 0 rgba(255,255,255,0.9)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-semibold tracking-widest text-sky-500 uppercase">Upper Wear</span>
          <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center">
            <span className="text-sky-500 text-[10px]">✓</span>
          </div>
        </div>
        {[
          { name: "Cream Linen Shirt", color: "#f5f0e8", tag: "Casual" },
          { name: "Navy Blazer", color: "#1e3a5f", tag: "Smart" },
        ].map((item) => (
          <div key={item.name} className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl border border-border flex-shrink-0 shadow-sm" style={{ background: item.color }} />
            <div>
              <p className="text-xs font-semibold text-foreground leading-tight">{item.name}</p>
              <p className="text-[10px] text-muted-foreground">{item.tag}</p>
            </div>
          </div>
        ))}
        <div className="mt-3 h-1.5 rounded-full bg-sky-50 overflow-hidden">
          <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-sky-300 to-sky-500" />
        </div>
        <p className="text-[9px] text-muted-foreground mt-1">Style match: 80%</p>
        {/* 3D shine layer */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)" }} />
      </div>
    </Card3D>
  );
}

function LowerWearCard() {
  return (
    <Card3D
      className="absolute right-[2%] top-[24%] w-52 z-10"
      style={{ animation: "floatB 7s ease-in-out infinite", filter: "drop-shadow(0 24px 48px rgba(3,105,161,0.18))" }}
    >
      <div
        className="bg-white/90 rounded-3xl p-4 border border-white relative overflow-hidden"
        style={{ backdropFilter: "blur(12px)", boxShadow: "0 8px 40px rgba(180,140,60,0.1), inset 0 1px 0 rgba(255,255,255,0.9)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-semibold tracking-widest text-amber-500 uppercase">Lower Wear</span>
          <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center">
            <span className="text-amber-400 text-[10px]">✓</span>
          </div>
        </div>
        {[
          { name: "Slim Chinos", color: "#c9b99a", tag: "Neutral" },
          { name: "Dark Denim", color: "#2d3748", tag: "Staple" },
        ].map((item) => (
          <div key={item.name} className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl border border-border flex-shrink-0 shadow-sm" style={{ background: item.color }} />
            <div>
              <p className="text-xs font-semibold text-foreground leading-tight">{item.name}</p>
              <p className="text-[10px] text-muted-foreground">{item.tag}</p>
            </div>
          </div>
        ))}
        <div className="flex gap-1 mt-3">
          {["Mon", "Wed", "Fri", "Sat"].map((d, i) => (
            <div key={d} className="flex-1 text-center">
              <div className="w-full h-8 rounded-lg bg-amber-50 flex items-end justify-center pb-1">
                <div className="w-2 rounded-sm bg-amber-300" style={{ height: `${[10, 16, 8, 14][i]}px` }} />
              </div>
              <p className="text-[8px] text-muted-foreground mt-0.5">{d}</p>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)" }} />
      </div>
    </Card3D>
  );
}

function FootwearCard() {
  return (
    <Card3D
      className="absolute left-[5%] bottom-[14%] w-48 z-10"
      style={{ animation: "floatC 5.5s ease-in-out infinite", filter: "drop-shadow(0 20px 40px rgba(3,105,161,0.16))" }}
    >
      <div
        className="bg-white/90 rounded-3xl p-4 border border-white relative overflow-hidden"
        style={{ backdropFilter: "blur(12px)", boxShadow: "0 8px 32px rgba(236,72,153,0.08), inset 0 1px 0 rgba(255,255,255,0.9)" }}
      >
        <div className="flex items-center gap-1.5 mb-3">
          <Plus size={11} className="text-pink-400" />
          <span className="text-[10px] font-semibold tracking-widest text-pink-400 uppercase">Add Footwear</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl border border-border bg-[#f8f8f6] flex-shrink-0 flex items-center justify-center shadow-sm">
            <span className="text-base">👟</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground leading-tight">White Leather Derby</p>
            <p className="text-[10px] text-muted-foreground">Classic · EU 42</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          {["#f8f8f6", "#2d3748", "#c9b99a"].map((c) => (
            <div key={c} className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ background: c }} />
          ))}
        </div>
        <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)" }} />
      </div>
    </Card3D>
  );
}

function AiSuggestCard() {
  return (
    <Card3D
      className="absolute right-[4%] bottom-[12%] w-56 z-10"
      style={{ animation: "floatD 8s ease-in-out infinite", filter: "drop-shadow(0 24px 48px rgba(129,140,248,0.25))" }}
    >
      <div
        className="bg-white/90 rounded-3xl p-4 border border-white relative overflow-hidden"
        style={{ backdropFilter: "blur(12px)", boxShadow: "0 8px 40px rgba(129,140,248,0.12), inset 0 1px 0 rgba(255,255,255,0.9)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-xl bg-violet-100 flex items-center justify-center shadow-sm">
            <Sparkles size={14} className="text-violet-500" />
          </div>
          <span className="text-[10px] font-semibold tracking-widest text-violet-500 uppercase">AI Suggest</span>
        </div>
        <div className="bg-gradient-to-br from-violet-50 to-sky-50 rounded-2xl p-3 mb-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-foreground">Outfit Score</p>
            <div className="flex items-center gap-0.5">
              <Star size={10} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-violet-600">94</span>
              <span className="text-[9px] text-muted-foreground">/100</span>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground leading-snug">Perfect for Quiet Luxury. Refined neutral palette.</p>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {["Monochrome", "Tailored Fit", "Neutral"].map((tag) => (
            <span key={tag} className="text-[9px] font-medium bg-violet-50 text-violet-500 rounded-full px-2 py-0.5">{tag}</span>
          ))}
        </div>
        <button className="w-full flex items-center justify-center gap-1 bg-violet-500 hover:bg-violet-600 transition-colors text-white text-[11px] font-semibold rounded-xl py-2">
          <Zap size={11} />
          Apply Suggestion
        </button>
        <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 55%)" }} />
      </div>
    </Card3D>
  );
}

function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Icon = step.icon;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${index * 0.15}s`,
      }}
    >
      <div
        className="relative rounded-3xl p-8 border border-white/70 group cursor-default"
        style={{
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(20px)",
          boxShadow: `0 4px 40px ${step.glow}, 0 1px 0 rgba(255,255,255,0.9) inset`,
          transformStyle: "preserve-3d",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-6px) rotateX(2deg)";
          (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${step.glow}, 0 1px 0 rgba(255,255,255,0.9) inset`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "";
          (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 40px ${step.glow}, 0 1px 0 rgba(255,255,255,0.9) inset`;
        }}
      >
        {/* Step number - big background */}
        <span
          className="absolute top-4 right-6 text-7xl font-black leading-none pointer-events-none select-none"
          style={{ color: step.accent, opacity: 0.08, fontFamily: "Poppins, sans-serif" }}
        >
          {step.num}
        </span>

        {/* Icon */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow-md"
          style={{ background: `linear-gradient(135deg, ${step.accent}22, ${step.accent}44)`, border: `1.5px solid ${step.accent}44` }}
        >
          <Icon size={22} style={{ color: step.accent }} strokeWidth={1.8} />
        </div>

        {/* Step num label */}
        <p className="text-xs font-black tracking-widest mb-2" style={{ color: step.accent, fontFamily: "Poppins, sans-serif" }}>
          {step.num}
        </p>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3 leading-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
          {step.title}
        </h3>

        {/* Desc */}
        <p className="text-sm text-foreground/60 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
          {step.desc}
        </p>

        {/* Tag */}
        <div
          className="mt-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase"
          style={{ background: `${step.accent}18`, color: step.accent }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: step.accent }} />
          {step.tag}
        </div>

        {/* Shine */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 50%)" }} />
      </div>
    </div>
  );
}

function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="relative z-20"
      style={{ background: "#f5f0e8" }}
    >
      <div ref={ref} className="max-w-5xl mx-auto px-8 md:px-16 pt-24 pb-32">

        {/* Section label — rule + text + rule */}
        <div
          className="flex items-center gap-4 mb-12"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}
        >
          <div className="h-px w-8 bg-amber-700/40" />
          <span
            className="text-[10px] font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#92704a", fontFamily: "Inter, sans-serif" }}
          >
            How It Works
          </span>
        </div>

        {/* Headline */}
        <div
          className="mb-16 md:mb-20"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(28px)", transition: "all 0.65s ease 0.1s" }}
        >
          <h2
            className="text-5xl md:text-6xl leading-[1.1] text-[#1a1208]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Three steps to your
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 400 }}>perfect outfit</em>
          </h2>
        </div>

        {/* Steps — vertical list */}
        <div className="flex flex-col">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === STEPS.length - 1;
            return (
              <div
                key={step.num}
                className="relative flex gap-8 md:gap-14"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(32px)",
                  transition: `opacity 0.6s ease ${0.2 + i * 0.15}s, transform 0.65s cubic-bezier(0.23,1,0.32,1) ${0.2 + i * 0.15}s`,
                }}
              >
                {/* Left: number + connector line */}
                <div className="flex flex-col items-center flex-shrink-0 w-12">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      background: "#1a1208",
                      color: "#f5f0e8",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {step.num}
                  </div>
                  {!isLast && (
                    <div className="w-px flex-1 mt-3" style={{ background: "repeating-linear-gradient(to bottom, #c9b89a 0px, #c9b89a 5px, transparent 5px, transparent 10px)", minHeight: "4rem" }} />
                  )}
                </div>

                {/* Right: content */}
                <div className={`flex-1 pb-14 ${isLast ? "" : ""}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${step.accent}20`, border: `1px solid ${step.accent}40` }}
                    >
                      <Icon size={16} style={{ color: step.accent }} strokeWidth={1.8} />
                    </div>
                    <span
                      className="text-[10px] font-semibold tracking-[0.15em] uppercase"
                      style={{ color: step.accent, fontFamily: "Inter, sans-serif" }}
                    >
                      {step.tag}
                    </span>
                  </div>

                  <h3
                    className="text-2xl md:text-3xl mb-3 text-[#1a1208]"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, letterSpacing: "-0.01em" }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="text-[15px] leading-relaxed max-w-lg"
                    style={{ color: "#6b5a43", fontFamily: "Inter, sans-serif" }}
                  >
                    {step.desc}
                  </p>

                  {/* Subtle separator line */}
                  {!isLast && (
                    <div className="mt-10 h-px w-full" style={{ background: "rgba(26,18,8,0.08)" }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className="mt-4 flex items-center gap-6"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "all 0.6s ease 0.65s" }}
        >
          <button
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-wide transition-all hover:opacity-90 active:scale-95"
            style={{
              fontFamily: "Inter, sans-serif",
              background: "#1a1208",
              color: "#f5f0e8",
              letterSpacing: "0.04em",
            }}
          >
            START BUILDING
            <ChevronRight size={14} />
          </button>
          <span className="text-xs text-[#92704a]" style={{ fontFamily: "Inter, sans-serif" }}>
            No credit card required
          </span>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>
      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translateY(0px) rotateY(-2deg) rotateX(1deg); }
          50% { transform: translateY(-16px) rotateY(2deg) rotateX(-1deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotateY(2deg) rotateX(-1deg); }
          50% { transform: translateY(-20px) rotateY(-2deg) rotateX(1deg); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(0px) rotateY(-1deg) rotateX(2deg); }
          50% { transform: translateY(-12px) rotateY(1deg) rotateX(-2deg); }
        }
        @keyframes floatD {
          0%, 100% { transform: translateY(0px) rotateY(1.5deg) rotateX(1deg); }
          50% { transform: translateY(-14px) rotateY(-1.5deg) rotateX(-1deg); }
        }
        @keyframes cloudDrift {
          0% { transform: translateX(0); }
          100% { transform: translateX(20px); }
        }
        @keyframes pulseSoft {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        * { scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── HERO ── */}
      <div
        className="min-h-screen w-full relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #7dd3fc 0%, #bae6fd 30%, #e0f2fe 65%, #dbeafe 100%)",
          perspective: "1200px",
        }}
      >
        {/* Clouds */}
        {CLOUDS.map(({ id, w, opacity, ...pos }) => {
          const s: React.CSSProperties = {};
          if ("top" in pos) s.top = pos.top as string;
          if ("bottom" in pos) s.bottom = pos.bottom as string;
          if ("left" in pos) s.left = pos.left as string;
          if ("right" in pos) s.right = pos.right as string;
          return (
            <div key={id} style={{ position: "absolute", zIndex: 0, ...s, animation: `cloudDrift ${5 + id * 1.4}s ease-in-out infinite alternate` }}>
              <Cloud w={w} opacity={opacity} style={{}} />
            </div>
          );
        })}

        {/* Sky glow orb */}
        <div className="absolute pointer-events-none" style={{ width: 600, height: 600, top: "5%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 65%)", zIndex: 0 }} />
        <div className="absolute pointer-events-none" style={{ width: 320, height: 320, bottom: "5%", left: "18%", background: "radial-gradient(circle, rgba(129,140,248,0.12) 0%, transparent 70%)", zIndex: 0 }} />

        {/* Nav */}
        <nav className="relative z-20 flex items-center justify-between px-8 py-5 md:px-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #0369a1, #38bdf8)", boxShadow: "0 4px 14px rgba(3,105,161,0.35)" }}>
              <span className="text-white text-base font-bold" style={{ fontFamily: "Poppins" }}>W</span>
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight" style={{ fontFamily: "Poppins" }}>Wardrobe</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>{link}</a>
            ))}
          </div>

          <div className="hidden md:flex">
            <button className="text-sm font-semibold px-5 py-2 rounded-2xl border border-white/70 bg-white/60 hover:bg-white/90 transition-all backdrop-blur-sm text-foreground shadow-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              Sign In
            </button>
          </div>

          <button className="md:hidden p-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/60" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="relative z-20 md:hidden bg-white/90 backdrop-blur-md mx-4 rounded-3xl p-6 mb-4 shadow-xl border border-white/80">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="block py-2.5 text-sm font-medium text-foreground/80 border-b border-border last:border-0">{link}</a>
            ))}
            <button className="mt-4 w-full text-sm font-semibold py-2.5 rounded-2xl bg-primary text-primary-foreground">Sign In</button>
          </div>
        )}

        {/* Hero content */}
        <section className="relative z-10 flex flex-col items-center text-center px-6 pt-10 pb-48 md:pt-16 md:pb-56">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-white/80 shadow-sm mb-6" style={{ animation: "pulseSoft 3s ease-in-out infinite" }}>
            <Sparkles size={13} className="text-violet-500" />
            <span className="text-xs font-semibold text-violet-600" style={{ fontFamily: "Inter, sans-serif" }}>AI-Powered Style Intelligence</span>
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] mb-6 max-w-3xl"
            style={{ fontFamily: "Poppins, sans-serif", letterSpacing: "-0.025em" }}
          >
            All Your Clothing Plans.{" "}
            <span style={{ background: "linear-gradient(135deg, #0369a1 0%, #38bdf8 50%, #818cf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              One Simple Wardrobe.
            </span>
          </h1>

          <p className="text-base md:text-lg text-foreground/60 max-w-xl mb-4 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Quiet Luxury · Understated tailoring, neutral tones, and quality over logos. Confidence without shouting.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-lg">
            {STYLE_TAGS.map((tag) => (
              <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full border border-white/80 bg-white/50 backdrop-blur-sm text-foreground/70 hover:bg-white/80 transition-colors cursor-default" style={{ fontFamily: "Inter, sans-serif" }}>
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm text-foreground/45 mb-8 italic" style={{ fontFamily: "Inter, sans-serif" }}>
            — automatically organized for every Style.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <button
              className="group flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold text-white transition-all active:scale-95"
              style={{ fontFamily: "Poppins, sans-serif", background: "linear-gradient(135deg, #0369a1 0%, #0284c7 60%, #38bdf8 100%)", boxShadow: "0 8px 30px rgba(3,105,161,0.35)" }}
            >
              <Download size={16} />
              Download App
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold bg-white/70 backdrop-blur-sm border border-white/80 hover:bg-white/90 transition-all text-foreground shadow-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              Watch Demo
            </button>
          </div>

          <div className="flex items-center gap-3 mt-8">
            <div className="flex -space-x-2">
              {["#fbbf24", "#818cf8", "#34d399", "#f87171", "#38bdf8"].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-white shadow-sm" style={{ background: c }} />
              ))}
            </div>
            <p className="text-xs text-foreground/60" style={{ fontFamily: "Inter, sans-serif" }}>
              <strong className="text-foreground">12,400+</strong> stylists already organized
            </p>
          </div>
        </section>

        {/* Floating 3D cards */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ perspective: "1000px" }}>
          <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
            <div className="pointer-events-auto"><UpperWearCard /></div>
            <div className="pointer-events-auto"><LowerWearCard /></div>
            <div className="pointer-events-auto"><FootwearCard /></div>
            <div className="pointer-events-auto"><AiSuggestCard /></div>
          </div>
        </div>

        {/* Bottom fade into process section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10" style={{ background: "linear-gradient(to top, #f0f9ff, transparent)" }} />
      </div>

      {/* ── PROCESS SECTION ── */}
      <ProcessSection />
    </div>
  );
}
