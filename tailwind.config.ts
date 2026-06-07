import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#070a12",
          900: "#0a0e1a",
          800: "#0f1424",
          700: "#161c2f",
        },
        accent: {
          blue: "#0d99ff",
          cyan: "#7dc4ff",
          violet: "#7c3aed",
          green: "#10b981",
          amber: "#f59e0b",
        },
      },
      fontFamily: {
        display: ["'Inter Tight'", "system-ui", "sans-serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
        wider2: "0.16em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        "grid-pan": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(40px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both",
        shimmer: "shimmer 6s linear infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "grid-pan": "grid-pan 8s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
