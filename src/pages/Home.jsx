import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Footer from "../components/layout/Footer.jsx";
import Navbar from "../components/layout/Navbar.jsx";
import Hero from "../components/home/Hero.jsx";
import MyStack from "../components/home/MyStack.jsx";
import ParticleCanvas from "../components/home/ParticleCanvas.jsx";
import ProjectsList from "../components/home/ProjectsList.jsx";

// Register ScrollTrigger di luar komponen utama agar diinisialisasi sekali saja
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // State untuk melacak titik mana yang sedang menyala
  const [activeStep, setActiveStep] = useState(0);

  // Total titik indikator yang ingin ditampilkan (bisa disesuaikan, misalnya 10 atau 12)
  const totalSteps = 10;

  useGSAP(() => {
    // Memantau pergerakan scroll dari seluruh halaman (document.documentElement)
    gsap.to({}, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true, // Mengikuti putaran roda mouse
        onUpdate: (self) => {
          // Menghitung titik mana yang harus menyala berdasarkan rasio scroll (0 sampai 1)
          // Menggunakan Math.min agar index tidak melebihi totalSteps - 1 saat mentok di bawah
          const currentStep = Math.min(
            Math.floor(self.progress * totalSteps),
            totalSteps - 1
          );
          setActiveStep(currentStep);
        }
      }
    });
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg text-white">

      {/* ========================================
        TERMINAL DOTS PROGRESS BAR
        (Posisi fixed di kanan tengah)
        ======================================== */}
      <div className="fixed right-8 top-1/2 z-[90] hidden -translate-y-1/2 flex-col gap-[10px] lg:flex">

        {/* Looping untuk merender titik-titik */}
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1 rounded-full transition-all duration-300 ${index <= activeStep
              ? "bg-[#00FF41] shadow-[0_0_10px_#00FF41] scale-100" // Menyala hijau neon jika terlewati
              : "bg-zinc-800 scale-75" // Meredup dan sedikit mengecil jika belum terlewati
              }`}
          />
        ))}
      </div>
      {/* ======================================== */}

      {/* Komponen-komponen utama portofolio Anda */}
      <ParticleCanvas
        spacing={20}
        bgColor="#121110"
      />
      <Navbar />
      <Hero />
      <MyStack />
      <ProjectsList />
      <Footer />
    </main>
  );
}