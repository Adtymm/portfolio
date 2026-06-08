export default function Footer() {
  return (
    <footer id="contact" className="relative z-10 border-t border-border-subtle px-5 py-12 md:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-neon">Get in touch</p>
          <h2 className="mt-3 max-w-2xl font-anton text-3xl uppercase leading-none md:text-4xl">
            Let&apos;s build something useful.
          </h2>
        </div>
        <div className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">
          <a className="hover:text-neon" href="mailto:hello@example.com">
            Email
          </a>
          <a className="hover:text-neon" href="https://linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="hover:text-neon" href="https://github.com" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
