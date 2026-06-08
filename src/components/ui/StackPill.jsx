export default function StackPill({ children }) {
  return (
    <span className="rounded-full border border-border-subtle bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-300">
      {children}
    </span>
  );
}
