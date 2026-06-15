import { useState, useEffect } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // State ini memastikan konten di dalam laci hanya dirender setelah
  // animasi terbuka dimulai, mencegah teks meluap saat efek jelly sedang berjalan
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 600); // Samakan dengan durasi animasi
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Button (Fixed di kanan atas) */}
      <button
        onClick={toggleMenu}
        className="group fixed right-8 top-6 z-[80] flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-indigo-500/50 hover:bg-black/60 focus:outline-none shadow-lg"
      >
        <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
          {/* Garis Atas */}
          <rect
            fill="white"
            height="2"
            width="24"
            x="4"
            y="11"
            className={`origin-[16px_12px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen
              ? "translate-y-[4px] rotate-45"
              : "group-hover:-translate-y-[2px]"
              }`}
          />
          {/* Garis Bawah */}
          <rect
            fill="white"
            height="2"
            width="24"
            x="4"
            y="19"
            className={`origin-[16px_20px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen
              ? "-translate-y-[4px] -rotate-45"
              : "group-hover:translate-y-[2px]"
              }`}
          />
        </svg>
      </button>

      {/* Overlay Backdrop */}
      <div
        onClick={toggleMenu}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
      />

      {/* Side Menu Drawer - PERHATIKAN BAGIAN INI
        Di sinilah efek "Jelly" diterapkan menggunakan 'rounded-l-full' 
      */}
      <div
        className={`fixed right-0 top-0 z-[70] h-full w-full bg-[#121110] shadow-2xl transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:w-[400px] ${isOpen
          ? "translate-x-0 rounded-l-none visibility-visible"
          : "translate-x-full rounded-l-[100%] visibility-hidden"
          // Kita pakai 100% (bukan full/9999px) karena kita ingin bentuk oval, bukan kapsul
          }`}
        style={{
          // Inline style diperlukan untuk border-radius 100% di satu sisi spesifik 
          // karena Tailwind `rounded-l-full` menggunakan nilai 9999px, bukan persentase, 
          // yang membuat bentuknya pil kapsul, bukan lengkungan oval/jelly.
          borderTopLeftRadius: isOpen ? '0' : '100%',
          borderBottomLeftRadius: isOpen ? '0' : '100%',
        }}
      >
        <div className="flex h-full w-full flex-col justify-between overflow-y-auto p-8 pt-32 pb-16 md:p-24">

          {/* Bagian Atas: Menu Utama */}
          <nav className="flex flex-col space-y-2 md:space-y-4">
            {[
              { name: "Home", href: "#home", delay: "delay-[200ms]" },
              { name: "Skill", href: "#mystack", delay: "delay-[250ms]" },
              { name: "Experience", href: "#experience", delay: "delay-[300ms]" },
              { name: "Project", href: "#projects", delay: "delay-[350ms]" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={toggleMenu}
                className={`group flex items-center font-anton text-3xl md:text-5xl tracking-wider text-zinc-500 uppercase transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-indigo-400 ${isOpen
                  ? `translate-x-0 opacity-100 ${item.delay}`
                  : "-translate-x-[40px] opacity-0 delay-0"
                  }`}
              >
                <span className="relative overflow-hidden inline-block pb-2">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">{item.name}</span>
                  <span className="absolute inset-0 block translate-y-full text-indigo-400 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">{item.name}</span>
                </span>
              </a>
            ))}
          </nav>

          {/* Bagian Bawah: Social Links */}
          <div className="mt-20">
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
              Connect
            </p>
            <nav className="flex flex-wrap gap-8">
              {[
                { name: "LinkedIn", href: "https://www.linkedin.com/in/adityammaulana/", delay: "delay-[400ms]", icon: Linkedin },
                { name: "GitHub", href: "https://github.com/Adtymm", delay: "delay-[450ms]", icon: Github },
                { name: "WhatsApp", href: "https://wa.me/6285156545169", delay: "delay-[500ms]", icon: FaWhatsapp },
                { name: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=adtyamuhamadmaulana@gmail.com", delay: "delay-[550ms]", icon: Mail },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`group relative flex items-center font-sans text-sm font-bold text-white transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-indigo-400 ${isOpen
                      ? `translate-y-0 opacity-100 ${social.delay}`
                      : "translate-y-[20px] opacity-0 delay-0"
                      }`}
                  >
                    <span className="relative overflow-hidden pb-0.5">
                      <span className="flex items-center gap-2 transition-transform duration-300 group-hover:-translate-y-full"><Icon size={16} /> {social.name}</span>
                      <span className="absolute inset-0 flex items-center gap-2 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-indigo-400"><Icon size={16} /> {social.name}</span>
                    </span>
                    <span className="ml-1 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">↗</span>
                  </a>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}