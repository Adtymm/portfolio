import { ArrowUpRight, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects.js";

export default function ProjectsList() {
  return (
    <section id="projects" className="relative z-10 flex w-full flex-col items-center justify-center py-24 md:py-32">

      {/* Box Model disamakan dengan Hero dan MyStack:
          w-full max-w-[1440px] px-8 md:px-32 lg:px-40
      */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col px-8 md:px-32 lg:px-40">

        {/* Header Title */}
        <div className="mb-16">
          <h3 className="mb-12 flex items-center font-mono text-sm uppercase tracking-widest text-zinc-200">
            <FolderOpen className="mr-3 text-[#00FF41]" size={20} />
            Selected Projects
          </h3>
        </div>

        {/* List Container
          Menggunakan 'group/list' untuk mendeteksi saat seluruh area daftar di-hover 
        */}
        <div className="group/list relative flex flex-col border-t border-border-subtle">
          {projects.map((project, index) => {
            // Memformat index menjadi _01., _02., dst.
            const formattedIndex = `_${String(index + 1).padStart(2, "0")}.`;

            return (
              <Link
                key={project.slug}
                to={`/project/${project.slug}`}
                // 'group/item' untuk trigger efek spesifik pada baris ini
                // Saat list di hover, opacity semua jadi 30%, tapi yang di-hover paksa jadi 100%
                className="group/item relative flex w-full items-start gap-4 border-b border-border-subtle py-12 transition-opacity duration-500 hover:!opacity-100 group-hover/list:opacity-30"
              >
                {/* Index Number */}
                <span className="pt-2 font-mono text-zinc-300">
                  {formattedIndex}
                </span>

                {/* Main Content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-4">
                    {/* Efek Premium Text Fill diterjemahkan ke Tailwind 
                      Menggunakan background linear-gradient yang digeser posisinya
                    */}
                    <h4 className="whitespace-nowrap font-anton text-[40px] uppercase leading-[1.2] text-transparent md:text-[60px] bg-[linear-gradient(to_right,#00FF41_50%,white_50%)] bg-[length:200%_100%] bg-[position:100%_0] bg-clip-text transition-[background-position] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:bg-[position:0%_0]">
                      {project.name}
                    </h4>

                    {/* Animasi Ikon Panah Masuk */}
                    <ArrowUpRight
                      size={40}
                      className="text-white opacity-0 -translate-x-5 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:translate-x-0 group-hover/item:opacity-100"
                    />
                  </div>

                  {/* Tech Stack List dengan Bullet Points */}
                  <div className="mt-1 flex items-center gap-2 font-mono text-sm text-zinc-400">
                    {project.tech.map((item, i) => (
                      <span key={item} className="flex items-center gap-2">
                        <span>{item}</span>
                        {i < project.tech.length - 1 && (
                          <span className="text-zinc-700">•</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gambar Preview Melayang (Hanya muncul di layar besar - lg:flex)
                  Muncul dari ukuran kecil (scale-80) ke ukuran normal (scale-100)
                */}
                <div className="pointer-events-none absolute -top-[50px] right-0 z-20 hidden h-[400px] w-[300px] items-center lg:flex">
                  <img
                    // Pastikan di data 'projects.js' Anda memiliki properti 'image'
                    src={project.image || "/api/placeholder/300/400"}
                    alt={project.name}
                    className="h-full w-full scale-80 rounded-xl border border-zinc-800 object-cover opacity-0 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/item:scale-100 group-hover/item:opacity-100"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}