import { useState, useEffect } from "react";

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
        className="group fixed right-8 top-6 z-[80] flex items-center justify-center rounded-full p-2 text-white focus:outline-none"
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
        <div className="flex h-full w-full flex-col overflow-y-auto p-8 pt-24 md:p-12">

          {/* Konten Menu */}
          <div className="mt-8 flex gap-16">

            {/* Kolom Social */}
            <div className="w-1/2">
              <p className="mb-6 font-mono text-sm uppercase tracking-widest text-[#A0A0A0]">
                Social
              </p>
              <nav className="flex flex-col space-y-4">
                <a
                  href="#"
                  className={`block font-sans text-lg font-bold text-white transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-[#00FF41] ${isOpen
                    ? "translate-x-0 translate-y-0 opacity-100 delay-[450ms]"
                    : "translate-x-[30px] translate-y-[30px] opacity-0 delay-0"
                    }`}
                >
                  LinkedIn
                </a>
              </nav>
            </div>

            {/* Kolom Menu */}
            <div className="w-1/2">
              <p className="mb-6 font-mono text-sm uppercase tracking-widest text-[#A0A0A0]">
                Menu
              </p>
              <nav className="flex flex-col space-y-4">
                {[
                  { name: "Home", href: "#home", dot: "bg-[#ffb800]", delay: "delay-[300ms]" },
                  { name: "Projects", href: "#projects", dot: "bg-[#8b5cf6]", delay: "delay-[400ms]" },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={toggleMenu}
                    className={`group flex items-center font-sans text-lg font-bold text-white transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-[#00FF41] ${isOpen
                      ? `translate-x-0 translate-y-0 opacity-100 ${item.delay}`
                      : "translate-x-[30px] translate-y-[30px] opacity-0 delay-0"
                      }`}
                  >
                    <span className={`mr-3 inline-block h-2 w-2 rounded-full ${item.dot} transition-transform duration-300`} />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}