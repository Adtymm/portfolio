/**
 * cn — Utility to merge class names (lightweight, no clsx/tailwind-merge needed).
 * Filters out falsy values and joins with a space.
 */
export default function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
