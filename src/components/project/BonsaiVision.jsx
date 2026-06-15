import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Github } from "lucide-react";
import ParticleCanvas from "../../components/home/ParticleCanvas.jsx";
import Navbar from "../../components/layout/Navbar.jsx";

// ─── Scroll Progress Indicator ────────────────────────────────────────────────
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 h-24 w-[2px] bg-border-subtle hidden md:block z-40">
      <div
        className="w-[2px] bg-indigo-400 absolute top-0 left-0 transition-[height] duration-75"
        style={{ height: `${progress}%` }}
      />
    </div>
  );
}

// ─── Accuracy Badge ───────────────────────────────────────────────────────────
function AccBadge({ children }) {
  return (
    <span className="font-mono text-[12px] font-medium text-indigo-400 bg-indigo-400/[0.08] border border-indigo-400/20 px-[7px] py-[1px] rounded">
      {children}
    </span>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <h3 className="font-mono text-[13px] font-bold text-indigo-400 mb-4 uppercase tracking-wider">
      {children}
    </h3>
  );
}

// ─── FadeIn on scroll ─────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Interactive Image Slider ─────────────────────────────────────────────────
const SLIDER_IMAGES = [
  { url: "/images/bonsai/homebonsai.png", alt: "BonsaiVision upload interface", caption: "Input — User Upload Interface" },
  { url: "/images/bonsai/inputbonsai.png", alt: "Pot height configuration modal", caption: "Modal — Pot Reference Height Setup" },
  { url: "/images/bonsai/resultbonsai.png", alt: "Output analysis of both models", caption: "Output — CNN + RF-DETR Pipeline Result" },
];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(129,140,248,0.1)] group">
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {SLIDER_IMAGES.map((img, i) => (
          <figure key={i} className="relative shrink-0 w-full flex flex-col items-center bg-[#181716]">
            <div className="w-full h-[320px] sm:h-[460px]">
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-contain block rounded-lg"
                draggable={false}
              />
            </div>
            <figcaption className="absolute bottom-0 w-full bg-black/80 backdrop-blur-md border-t border-white/10 font-mono text-[12px] text-white/80 px-4 py-4 text-center">
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md opacity-0 transition-all duration-300 hover:bg-indigo-500/50 hover:scale-110 hover:border-indigo-400 group-hover:opacity-100"
      >
        <ChevronLeft size={20} className="mr-0.5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md opacity-0 transition-all duration-300 hover:bg-indigo-500/50 hover:scale-110 hover:border-indigo-400 group-hover:opacity-100"
      >
        <ChevronRight size={20} className="ml-0.5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute top-4 right-4 flex gap-2">
        {SLIDER_IMAGES.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-4 bg-indigo-400" : "w-1.5 bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BonsaiVision() {
  const navigate = useNavigate();
  // Scroll ke atas saat komponen pertama kali di-mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="relative min-h-screen bg-bg text-white selection:bg-neon selection:text-black">
        <ParticleCanvas spacing={20} bgColor="#121110" />
        <Navbar />
        <ScrollProgress />

        {/* Back button */}
        <header className="fixed top-4 left-4 md:top-8 md:left-8 z-50">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-5 py-2.5 backdrop-blur-md text-white/80 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-500/20 hover:text-white hover:shadow-[0_0_20px_rgba(129,140,248,0.2)]"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-mono text-[14px] font-bold uppercase tracking-widest">Back</span>
          </button>
        </header>

        {/* ── Main Content ── */}
        <main className="relative z-10 pt-32 pb-24 flex flex-col gap-0">

          {/* ── HEADER: Title ── */}
          <FadeIn delay={0} className="px-6 md:px-20 mx-auto w-full max-w-[1000px]">
            <section className="w-full max-w-[800px] mx-auto flex flex-col gap-3">
              <div className="flex flex-col items-start gap-6">
                <h1 className="font-anton text-[4.5rem] md:text-[6.5rem] text-white uppercase tracking-normal leading-[0.85]">
                  BONSAIVISION
                </h1>

                {/* GitHub Action Button */}
                <a
                  href="https://github.com/Adtymm/BonsaiFinal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-6 py-3 font-mono text-[12px] font-bold uppercase tracking-widest text-indigo-300 transition-all hover:border-indigo-400 hover:bg-indigo-500/20 hover:text-white hover:shadow-[0_0_20px_rgba(129,140,248,0.2)] w-fit"
                >
                  <Github size={18} className="transition-transform group-hover:scale-110" />
                  <span>View on Github</span>
                </a>
              </div>
            </section>
          </FadeIn>

          {/* ── IMAGE SLIDER ── */}
          <FadeIn delay={120} className="px-6 md:px-20 mx-auto w-full max-w-[1000px] mt-8 mb-14">
            <div className="w-full max-w-[800px] mx-auto">
              <ImageSlider />
            </div>
          </FadeIn>

          {/* ── DETAILS GRID ── */}
          <div className="px-6 md:px-20 mx-auto w-full max-w-[1000px]">
            <section className="grid grid-cols-1 md:grid-cols-12 gap-y-12 gap-x-16 w-full max-w-[800px] mx-auto">

              {/* ─── LEFT: Metadata ─────────────────────────── */}
              <div className="md:col-span-4 flex flex-col gap-8">

                <FadeIn delay={70}>
                  <div>
                    <Label>Year</Label>
                    <p className="font-sans text-[16px] text-white/90">2025</p>
                  </div>
                </FadeIn>

                <FadeIn delay={140}>
                  <div>
                    <Label>Tech &amp; Technique</Label>
                    <p className="font-mono text-[13px] text-white/75 leading-relaxed">
                      Python, CNN (VGG19),<br />
                      RF-DETR, Roboflow, Flask,<br />
                      React, Tailwind CSS
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={210}>
                  <div>
                    <Label>My Role</Label>
                    <p className="font-sans text-[15px] text-white font-semibold mb-4">
                      Solo Developer · Self-Initiated Final Project
                    </p>
                    <ul className="flex flex-col gap-4 text-[14px] text-white/80">
                      {[
                        { title: "Research", text: "Dataset curation and architecture experimentation (tried multiple CNN approaches before settling on VGG19)" },
                        { title: "ML Pipeline", text: "Custom CNN training + RF-DETR integration through a single Flask backend" },
                        { title: "Frontend", text: "Built the React interface that consumes both model outputs cleanly" },
                        { title: "Integration Challenge", text: "Connecting two architectures with fundamentally different output formats into one unified API" },
                      ].map((item) => (
                        <li key={item.title} className="flex items-start gap-3">
                          <span className="text-neon mt-0.5 shrink-0 bg-indigo-400/20 rounded-sm w-5 h-5 flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </span>
                          <span>
                            <strong className="text-white">{item.title}:</strong>{" "}
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              </div>

              {/* ─── RIGHT: Content ───────────────────────── */}
              <div className="md:col-span-8 flex flex-col gap-12">

                {/* Description */}
                <FadeIn delay={100}>
                  <div>
                    <Label>Description</Label>
                    <p className="font-sans text-[18px] text-white/90 leading-relaxed">
                      A dual-model AI web app that identifies bonsai species and estimates its height from a
                      single uploaded photo — built to automate what bonsai competition judges still do manually,
                      one tree at a time.
                    </p>
                  </div>
                </FadeIn>

                {/* The Real-World Problem */}
                <FadeIn delay={170}>
                  <div>
                    <Label>The Real-World Problem</Label>
                    <ul className="flex flex-col gap-4 text-[16px] text-white/80">
                      {[
                        <><strong className="text-white">Manually and one-by-one</strong> — bonsai competition judging is still slow and inconsistent.</>,
                        <>After surveying existing research, I found <strong className="text-white">no tool that combined species identification and height estimation</strong> in a single system.</>,
                        <>I chose this as my final project <strong className="text-white">not because it was assigned</strong>, but because the gap was real and worth solving.</>,
                      ].map((text, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>

                {/* How It Works — table only */}
                <FadeIn delay={240}>
                  <div>
                    <Label>How It Works — Two Models, One Pipeline</Label>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr>
                            {["Task", "Model", "Detail"].map((h) => (
                              <th
                                key={h}
                                className="font-mono text-[12px] text-white/40 uppercase tracking-wider py-3 border-b border-border-subtle"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="text-[15px]">
                          <tr>
                            <td className="py-5 border-b border-border-subtle text-white pr-4">Species Identification</td>
                            <td className="py-5 border-b border-border-subtle text-white pr-4">Custom CNN</td>
                            <td className="py-5 border-b border-border-subtle text-white">
                              Architecture: VGG19&nbsp;&nbsp;<AccBadge>74% accuracy</AccBadge>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-5 border-b border-border-subtle text-white pr-4">Height Estimation</td>
                            <td className="py-5 border-b border-border-subtle text-white pr-4">RF-DETR</td>
                            <td className="py-5 border-b border-border-subtle text-white/60">
                              Pre-trained via Roboflow · Object Detection
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </FadeIn>

                {/* What I Learned — quote only */}
                <FadeIn delay={310}>
                  <div>
                    <Label>What I Learned</Label>
                    <div className="p-5 border-l-2 border-indigo-400 bg-indigo-400/[0.03] rounded-r-lg">
                      <p className="font-sans text-[16px] text-white/80 italic leading-relaxed">
                        "This project taught me that{" "}
                        <strong className="text-white not-italic">
                          choosing the right architecture matters as much as writing the code.
                        </strong>{" "}
                        I tried multiple approaches before settling on VGG19 — each iteration taught me something
                        the documentation never could. More importantly, I learned that{" "}
                        <strong className="text-white not-italic">
                          shipping an imperfect product that solves a real problem
                        </strong>{" "}
                        is more valuable than a perfect model that never leaves a notebook."
                      </p>
                    </div>
                  </div>
                </FadeIn>

              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

