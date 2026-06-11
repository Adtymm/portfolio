import { useRef } from "react";
import { ArrowDown, ArrowRight, Download } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const disciplines = [
  ["#3b82f6", "Full-Stack Development"],
  ["#ef4444", "ML & Computer Vision"],
  ["#8b5cf6", "UI/UX Design"],
];

const stats = [
  ["5", "+", "Projects Shipped"],
  ["3", "x", "Disciplines Combined"],
  ["1", "st", "Solo ML Product"],
  ["\u221e", "", "Curiosity To Learn"],
];

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const elementsToAnimate = gsap.utils.toArray(".hero-anim");

    // 1. ANIMASI INTRO (Masuk bergantian saat halaman dibuka)
    gsap.set(elementsToAnimate, { y: 50, opacity: 0, scale: 0.98 });

    gsap.to(elementsToAnimate, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: "expo.out",
      delay: 0.2,
    });

    // 2. ANIMASI KELUAR SAAT DI-SCROLL (Menghilang per item dari atas ke bawah)
    gsap.fromTo(elementsToAnimate,
      {
        y: 0,
        opacity: 1,
        scale: 1,
      },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -100,
        opacity: 0,
        scale: 0.95,
        stagger: 0.1,
        ease: "power1.inOut",
        immediateRender: false,
      }
    );

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative z-10 flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden pb-12 pt-24 will-change-transform"
    >


      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start px-8 text-left md:px-24 lg:px-40">

        <div className="hero-anim mb-10">
        </div>

        <div className="hero-anim w-full">
          <h1 className="mb-8 font-anton text-6xl font-normal uppercase leading-[0.9] tracking-tighter text-white md:text-[8rem]">
            ADITYA MUHAMAD
            <br className="hidden md:block" /> <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">MAULANA</span>
          </h1>
        </div>

        <div className="hero-anim mb-12 flex max-w-3xl border-l-2 border-indigo-600 pl-6">
          <div>
            <p className="mb-3 font-mono text-sm uppercase tracking-widest text-indigo-400 ">// WHO I AM</p>
            <p className="text-xl leading-relaxed text-zinc-300">
              Informatics student who connects{" "}
              <span className="font-bold text-white">Machine Learning research, full-stack development, and UI/UX design</span>{" "}
              to build products people actually want to use, from a bonsai plant classifier to community web platforms.
            </p>
          </div>
        </div>

        <div className="hero-anim mb-16 flex flex-wrap gap-4">
          {disciplines.map(([color, discipline]) => (
            <div
              key={discipline}
              className="glass-panel flex items-center rounded-md border border-border-subtle bg-[#121110]/70 px-4 py-2"
            >
              <span className="mr-3 h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="font-mono text-sm text-zinc-300">{discipline}</span>
            </div>
          ))}
        </div>

        <div className="hero-anim mb-24 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-200 shadow-lg shadow-indigo-500/25 px-8 py-4 font-bold text-black transition-colors"
          >
            View My Projects
            <ArrowRight className="ml-2" size={18} />
          </a>
          <a
            href="/cv.pdf"
            className="glass-panel inline-flex items-center justify-center rounded-md border border-border-subtle px-8 py-4 font-bold text-white transition-colors duration-300 hover:bg-[#2b2a2a]"
          >
            Download CV
            <Download className="ml-2" size={18} />
          </a>
          <a href="#projects" className="ml-0 hidden items-center opacity-60 md:ml-8 md:flex">
            <span className="mr-4 h-px w-12 bg-white" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-300">Scroll to explore</span>
            <ArrowDown className="ml-2" size={15} />
          </a>
        </div>

        <div className="hero-anim grid w-full grid-cols-2 gap-8 border-t border-border-subtle pt-10 md:grid-cols-4">
          {stats.map(([value, suffix, label]) => (
            <div key={label}>
              <div className="mb-2 text-4xl font-medium text-white md:text-5xl">
                {value}
                {suffix && <span className="text-indigo-400">{suffix}</span>}
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-zinc-400">{label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}