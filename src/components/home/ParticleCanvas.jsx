import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

/**
 * ShimmeringDotsBackground — Per-dot pulse animation.
 *
 * Adapted from Stitch "dot new background" (Tajmirul Portfolio).
 * Each dot independently shimmers using a sine-based alpha pulse.
 * ~2% of dots are "bright" dots: larger, brighter white with a soft glow.
 *
 * @param {string} className
 * @param {number} spacing    Grid spacing in px (default 20)
 * @param {string} bgColor    Canvas background color (default "#121110")
 */
export default function ShimmeringDotsBackground({
  className,
  spacing = 20,
  bgColor = "#121110",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let frameId;
    let dots = [];
    let width, height;

    // ─── Init dot grid ──────────────────────────────────────────────
    function initDots(w, h) {
      dots = [];
      const cols = Math.ceil(w / spacing);
      const rows = Math.ceil(h / spacing);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const isBright = Math.random() > 0.98; // ~2% bright dots
          dots.push({
            x: i * spacing + spacing / 2,
            y: j * spacing + spacing / 2,
            baseAlpha: Math.random() * 0.15 + 0.05,  // 0.05 – 0.20
            pulse: Math.random() * Math.PI * 2,       // random start phase
            speed: Math.random() * 0.05 + 0.03,      // 0.03 – 0.08 (Faster shimmer)
            isBright,
            size: isBright
              ? Math.random() * 0.5 + 1.2             // bright: 1.2 – 1.7px
              : Math.random() * 0.4 + 0.8,            // normal: 0.8 – 1.2px
          });
        }
      }
    }

    // ─── Resize handler ────────────────────────────────────────────
    function resize() {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initDots(width, height);
    }

    // ─── Animate ──────────────────────────────────────────────────
    function animate() {
      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        dot.pulse += dot.speed;
        const alpha = dot.baseAlpha + Math.sin(dot.pulse) * 0.2;
        if (alpha <= 0) return;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);

        if (dot.isBright) {
          // Bright dot: white, more opacity, soft white glow
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, alpha * 2.5)})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(52, 86, 125, 0.5)";
        } else {
          // Normal dot: muted white shimmer
          ctx.fillStyle = `rgba(200, 200, 200, ${Math.max(0, alpha)})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // reset after each dot
      });

      frameId = requestAnimationFrame(animate);
    }

    // ─── Boot ────────────────────────────────────────────────────
    resize();
    animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spacing, bgColor]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none fixed inset-0 z-0", className)}
      style={{ backgroundColor: bgColor }}
      aria-hidden="true"
    />
  );
}
