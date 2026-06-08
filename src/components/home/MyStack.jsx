import { useRef } from "react";
import { Asterisk } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger agar bisa digunakan oleh GSAP
gsap.registerPlugin(ScrollTrigger);

const stackGroups = [
  {
    title: "Frontend",
    items: [
      { label: "JavaScript", image: "/images/javascript.png" },
      { label: "React", image: "/images/react.png" },
      { label: "Next.js", image: "/images/next-js.png", bg: "bg-zinc-200 p-1 rounded-md" },
      { label: "Tailwind CSS", image: "/images/tailwind.png" },
    ],
  },
  {
    title: "Backend",
    items: [
      { label: "Node.js", image: "/images/node.png" },
      { label: "Express.js", image: "/images/express.png", bg: "bg-zinc-200 p-1 rounded-md" },
      { label: "Flask", image: "/images/flask.png", bg: "bg-zinc-200 p-1 rounded-md" },
      { label: "REST API", mark: "API", color: "border border-[#00FF41] text-[#00FF41]" },
    ],
  },
  {
    title: "Database",
    items: [
      { label: "MySQL", image: "/images/mysql.png" },
      { label: "MongoDB", image: "/images/mongo.png" },
      { label: "Firebase", image: "/images/firebase.png" },
    ],
  },
  {
    title: "Tools",
    items: [
      { label: "Git", image: "/images/git.png" },
      { label: "Figma", image: "/images/figma.png" },
      { label: "Vercel", mark: "V", color: "bg-white text-black" },
    ],
  },
];

export default function MyStack() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Animasi Header "My Stack"
    gsap.from(".stack-header", {
      scrollTrigger: {
        trigger: ".stack-header",
        start: "top 90%", // Animasi mulai saat elemen mencapai 90% dari atas viewport
        end: "top 60%",   // Animasi selesai saat elemen mencapai 60% viewport
        scrub: 1,         // Efek mengikat ke scroll mouse dengan delay halus (1 detik)
      },
      y: 50,
      opacity: 0,
      scale: 0.9,
      ease: "power2.out",
    });

    // 2. Animasi setiap grup (Frontend, Backend, dll)
    const groups = gsap.utils.toArray(".stack-group");

    groups.forEach((group) => {
      const title = group.querySelector(".group-title");
      const items = group.querySelectorAll(".stack-item");

      // Membuat timeline agar judul dan item di dalamnya beranimasi secara sekuensial
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: group,
          start: "top 85%",
          end: "top 40%",
          scrub: 1.5, // Angka yang lebih besar membuat efek "tertinggal" (smooth lag) yang premium
        },
      });

      // Animasi Judul masuk dari kiri
      tl.from(title, {
        x: -50,
        opacity: 0,
        rotationX: -45, // Sedikit efek 3D flip
        duration: 1,
      })
        // Animasi Item masuk dari bawah bergantian (stagger)
        .from(items, {
          y: 60,
          opacity: 0,
          scale: 0.5,
          stagger: 0.2, // Jarak waktu muncul antar item
          duration: 1,
          ease: "back.out(1.7)", // Efek memantul ringan di akhir
        }, "<0.2"); // Dimulai 0.2 detik setelah animasi judul dimulai
    });
  }, { scope: containerRef }); // Scope membatasi pencarian class hanya di dalam komponen ini

  return (
    <section
      ref={containerRef}
      className="relative z-10 mx-auto max-w-[1440px] border-t border-border-subtle/30 px-8 py-32 md:px-32 lg:px-40"
    >
      <div className="stack-header mb-20">
        <h3 className="flex items-center font-mono text-sm uppercase tracking-widest text-zinc-200">
          <Asterisk className="mr-3 text-zinc-400" size={20} />
          My Stack
        </h3>
      </div>

      <div className="flex flex-col space-y-24">
        {stackGroups.map((group) => (
          <div key={group.title} className="stack-group flex flex-col gap-8 md:flex-row md:items-start">

            {/* Bagian Judul Grup */}
            <div className="md:w-1/3">
              <h4 className="group-title font-anton text-5xl uppercase leading-none tracking-wide text-white origin-left">
                {group.title}
              </h4>
            </div>

            {/* Bagian Item Grup */}
            <div className="grid grid-cols-2 items-center gap-x-11 gap-y-9 md:w-2/3 md:grid-cols-3">
              {group.items.map((item) => (
                <div key={item.label} className="stack-item flex items-center space-x-3 origin-bottom">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`${item.label} logo`}
                      className={`h-10 w-10 shrink-0 object-contain ${item.bg || ""}`}
                    />
                  ) : (
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded text-xs font-bold ${item.color}`}
                    >
                      {item.mark}
                    </div>
                  )}
                  <span className="text-lg text-white md:text-[20px]">{item.label}</span>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}