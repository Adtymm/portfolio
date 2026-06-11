import { Link } from "react-router-dom";

/**
 * Badge color variants — sesuai desain bento_grid_v2.html
 */
const badgeStyles = {
  solo: "border-blue-400/25 text-blue-400",
  group: "border-blue-400/25 text-blue-400",
  intern: "border-amber-400/25 text-amber-400",
};

/**
 * BentoCard — MagicUI-style card component
 * Mendukung mode "featured" (2 kolom) dan "regular" (1 kolom).
 */
export function BentoCard({ project, className = "", index }) {
  const { slug, tagline, badge, badgeType, tech, models, featured, category } =
    project;

  // Format index number: _01., _02., dst.
  const formattedIndex = `_${String(index + 1).padStart(2, "0")}.`;
  const categoryLabel = category ? ` / ${category}` : "";

  return (
    <div className={`${className}`}>
      <Link
        to={`/project/${slug}`}
        className="group relative flex flex-col h-full overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161514] p-6 cursor-pointer
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          hover:-translate-y-[3px]
          hover:border-indigo-400/70
          hover:shadow-[0_12px_40px_-10px_rgba(129,140,248,0.7)]"
      >
        {/* ── Gradient border overlay (MagicUI shimmer effect) ── */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[14px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, transparent 40%, rgba(129,140,248,0.7) 60%, transparent 80%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />

        {/* ── Neon glow bottom ── */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-indigo-400/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* ── Arrow icon (top-right) ── */}
        <div className="absolute top-5 right-5 flex h-7 w-7 items-center justify-center rounded-md border border-white/[0.07] text-white/25 text-sm transition-all duration-300 group-hover:border-indigo-400/70 group-hover:text-indigo-400/50 group-hover:rotate-45">
          ↗
        </div>

        {/* ── Card Index ── */}
        <div className="mb-2 font-mono text-[10px] tracking-[0.1em] text-white/30">
          {formattedIndex}{categoryLabel}
        </div>

        {/* ── Badge ── */}
        <span
          className={`mb-3 inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-[0.06em] ${badgeStyles[badgeType] ?? badgeStyles.group}`}
        >
          {badge}
        </span>

        {/* ── Project Name ── */}
        <div
          className={`mb-3 font-anton leading-none text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 from-50% to-white to-50% bg-[length:200%_100%] bg-right transition-all duration-1000 ease-out group-hover:bg-left ${featured ? "text-[52px]" : "text-[34px]"}`}
        >
          {project.name}
        </div>

        {/* ── Tagline ── */}
        <p
          className={`flex-grow text-white/40 leading-relaxed mb-4 ${featured ? "text-[13.5px] max-w-[440px]" : "text-[12px]"}`}
        >
          {tagline}
        </p>

        {/* ── AI Model Chips (hanya BonsaiVision/featured) ── */}
        {models && models.length > 0 && (
          <div className="mb-4 flex gap-2">
            {models.map((m) => (
              <div
                key={m.label}
                className="rounded-md border border-white/[0.07] bg-black/25 px-2.5 py-1.5"
              >
                <div className="font-mono text-[9px] tracking-[0.08em] uppercase text-white/30 mb-0.5">
                  {m.label}
                </div>
                <div className="text-[12px] font-semibold text-white/75">
                  {m.name}
                </div>
                <div className="font-mono text-[11px] text-indigo-300 mt-0.5">
                  {m.acc}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Tech Pills ── */}
        <div className="mt-auto flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span
              key={t}
              // BASE STATE (SEBELUM HOVER) - Glow Halus, Teks & Border Indigo Redup
              className="rounded border border-indigo-400/20 bg-indigo-400/5 px-2 py-0.5 font-mono text-[10px] text-indigo-300 shadow-[0_0_6px_rgba(129,140,248,0.2)] transition-all duration-300 group-hover:border-indigo-300 group-hover:bg-indigo-400/15 group-hover:text-indigo-100 group-hover:shadow-[0_0_12px_rgba(129,140,248,0.5)]"
            >
              {t}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
}
