import { useRef } from "react";
import { FolderOpen } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../../data/projects.js";
import { BentoGrid } from "../ui/BentoGrid.jsx";
import { BentoCard } from "../ui/BentoCard.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsList() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // ── 1. Header "Selected Projects" — fade + slide up dengan scrub ──
      gsap.from(".projects-header", {
        scrollTrigger: {
          trigger: ".projects-header",
          start: "top 90%",
          end: "top 65%",
          scrub: 1,
        },
        y: 40,
        opacity: 0,
        ease: "power2.out",
      });

      // ── 2. Featured card (BonsaiVision) — scale + fade masuk ──
      gsap.from(".bento-card-featured", {
        scrollTrigger: {
          trigger: ".bento-card-featured",
          start: "top 90%",
          end: "top 50%",
          scrub: 1.2,
        },
        y: 70,
        opacity: 0,
        scale: 0.96,
        ease: "power3.out",
      });

      // ── 3. Card biasa — stagger masuk dari bawah ──
      const regularCards = gsap.utils.toArray(".bento-card-regular");

      regularCards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            end: "top 55%",
            scrub: 1,
          },
          y: 60,
          opacity: 0,
          scale: 0.95,
          ease: "power2.out",
          // Offset delay berdasarkan posisi kolom (index % 3)
          delay: (i % 3) * 0.05,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-10 flex w-full flex-col items-center justify-center py-18 md:py-24"
    >
      {/* Box Model sejajar dengan Hero dan MyStack */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col px-4 md:px-24 lg:px-40">

        {/* Section Header */}
        <div className="projects-header mb-10">
          <h3 className="flex items-center font-mono text-sm uppercase tracking-widest text-zinc-200">
            <FolderOpen className="mr-3 text-indigo-400/70" size={20} />
            Selected Projects
          </h3>
        </div>

        {/* Bento Grid */}
        <BentoGrid>
          {projects.map((project, index) => (
            <BentoCard
              key={project.slug}
              project={project}
              index={index}
              className={
                project.featured
                  ? "md:col-span-2 min-h-[280px] bento-card-featured"
                  : "md:col-span-1 min-h-[280px] bento-card-regular"
              }
            />
          ))}
        </BentoGrid>

      </div>
    </section>
  );
}