import { motion } from "framer-motion";

/**
 * BentoGrid — MagicUI-style wrapper grid component
 * Menggunakan CSS Grid 3 kolom dengan gap, identik dengan API MagicUI.
 */
export function BentoGrid({ children, className = "" }) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 gap-3 w-full ${className}`}
    >
      {children}
    </div>
  );
}
