export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#121110",
        neon: "#00ff41",
        "border-subtle": "#222222",
        surface: "rgba(255,255,255,0.035)",
        "surface-hover": "rgba(255,255,255,0.07)",
        muted: "#8a8a8a",
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 255, 65, 0.22)",
      },
      animation: {
        "pulse-neon": "pulseNeon 2s cubic-bezier(0.16,1,0.3,1) infinite",
        scan: "scan 2.4s ease-in-out infinite",
      },
      keyframes: {
        pulseNeon: {
          "0%": { boxShadow: "0 0 0 0 rgba(0,255,65,0.45)" },
          "70%": { boxShadow: "0 0 0 10px rgba(0,255,65,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(0,255,65,0)" },
        },
        scan: {
          "0%": { transform: "translateX(-110%)" },
          "50%, 100%": { transform: "translateX(110%)" },
        },
      },
    },
  },
  plugins: [],
};
