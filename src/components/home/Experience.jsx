import { useRef } from "react";
import { Asterisk, BriefcaseBusiness } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Graphic Designer",
    company: "PT. Mardira Jaya Teknologi",
    type: "Internship",
    date: "Nov 2025 - Feb 2026 · 4 mos",
    description: "Produced visually compelling product mockup designs tailored to elevate brand appeal, collaborating with the marketing team to align outputs with product positioning.",
  },
  {
    role: "Fullstack Developer",
    company: "IAIF UIN Sunan Gunung Djati Bandung",
    type: "Internship",
    date: "Feb 2024 - Oct 2024 · 9 mos",
    description: "Spearheaded a full redevelopment of the official website into a modern web application using React.js and Firebase. Built a dynamic news feed, alumni article platform, and an integrated admin dashboard.",
  },
];

export default function Experience() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Header Animation
    gsap.from(".exp-header", {
      scrollTrigger: {
        trigger: ".exp-header",
        start: "top 90%",
        end: "top 65%",
        scrub: 1,
      },
      y: 40,
      opacity: 0,
      ease: "power2.out",
    });

    // Experience Items Animation
    const items = gsap.utils.toArray(".exp-item");
    items.forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 92%",
          end: "top 55%",
          scrub: 1,
        },
        y: 60,
        opacity: 0,
        scale: 0.95,
        ease: "power2.out",
      });
    });
  }, { scope: containerRef });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative z-10 mx-auto max-w-[1440px] border-t border-border-subtle/30 px-4 py-20 md:px-32 lg:px-40"
    >
      <div className="exp-header mb-16 flex items-center justify-between">
        <h3 className="flex items-center font-mono text-lg uppercase tracking-widest text-zinc-200">
          <Asterisk className="mr-3 text-indigo-400/70" size={30} />
          Experience
        </h3>
      </div>

      <div className="exp-list flex flex-col gap-8">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="exp-item group relative flex flex-col gap-6 overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161514] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-[0_12px_40px_-10px_rgba(129,140,248,0.3)] md:p-10"
          >
            {/* ── Gradient border overlay (MagicUI shimmer effect) ── */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[14px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: "linear-gradient(135deg, transparent 40%, rgba(129,140,248,0.7) 60%, transparent 80%)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "1px",
              }}
            />

            {/* ── Neon glow bottom ── */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-indigo-400/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Top Info */}
            <div className="relative z-10 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div className="flex flex-col">
                <h4 className="font-anton text-4xl uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 from-50% to-white to-50% bg-[length:200%_100%] bg-right transition-all duration-1000 ease-out group-hover:bg-left md:text-5xl">
                  {exp.role}
                </h4>
                <p className="mt-2 font-sans text-[16px] font-semibold text-indigo-300">
                  {exp.company}
                </p>
                <div className="mt-1 flex flex-col font-mono text-[11px] uppercase tracking-widest text-zinc-400 md:flex-row md:gap-4">
                  <span>{exp.date}</span>
                  <span className="hidden md:block">•</span>
                  <span className="text-indigo-400/80">{exp.type}</span>
                </div>
              </div>
              <div className="mt-4 flex shrink-0 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-400/10 p-3 text-indigo-400 md:mt-0">
                <BriefcaseBusiness size={24} />
              </div>
            </div>

            {/* Description */}
            <p className="mt-2 text-[14px] leading-relaxed text-zinc-300 md:text-[15px]">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
