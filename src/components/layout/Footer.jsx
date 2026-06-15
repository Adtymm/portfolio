import { Github, Linkedin, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="contact" className="relative z-10 border-t border-border-subtle px-5 py-12 md:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-indigo-400">Get in touch</p>
          <h2 className="mt-3 max-w-2xl font-anton text-3xl uppercase leading-none md:text-4xl">
            Let&apos;s build something useful.
          </h2>
        </div>
        <div className="mt-6 flex flex-wrap gap-6 font-mono text-sm uppercase tracking-widest text-zinc-200 md:mt-0">
          <a className="hover:text-indigo-400 flex items-center gap-2 transition-colors" href="https://wa.me/6285156545169" target="_blank" rel="noreferrer">
            <FaWhatsapp size={18} /> WhatsApp
          </a>
          <a className="hover:text-indigo-400 flex items-center gap-2 transition-colors" href="https://mail.google.com/mail/?view=cm&fs=1&to=adtyamuhamadmaulana@gmail.com" target="_blank" rel="noreferrer">
            <Mail size={18} /> Email
          </a>
          <a className="hover:text-indigo-400 flex items-center gap-2 transition-colors" href="https://www.linkedin.com/in/adityammaulana/" target="_blank" rel="noreferrer">
            <Linkedin size={18} /> LinkedIn
          </a>
          <a className="hover:text-indigo-400 flex items-center gap-2 transition-colors" href="https://github.com/Adtymm" target="_blank" rel="noreferrer">
            <Github size={18} /> GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
