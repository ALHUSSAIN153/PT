/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg-main)",
        card: "var(--bg-card)",
        glass: "var(--bg-glass)",

        text: "var(--text-main)",
        muted: "var(--text-muted)",

        border: "var(--border-main)",

        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
      },
    },
  },
  plugins: [],
};
