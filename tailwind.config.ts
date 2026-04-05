import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        card: "#1a1a1a",
        cardHover: "#222222",
        gold: "#F5C518",
        goldDim: "#c9a316",
        textPrimary: "#ffffff",
        textSecondary: "#a1a1a1",
        textMuted: "#6b6b6b",
        border: "#2a2a2a",
        borderLight: "#333333",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
