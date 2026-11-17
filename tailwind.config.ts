import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        celebes: ["'Celebes'", "var(--font-celebes)", "sans-serif"],
        sans: ["'Celebes'", "var(--font-celebes)", "sans-serif"],
      },
      screens: {
        ipadpro: { max: "1100px", min: "1024px" },
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        webprimary: {
          DEFAULT: "#1e3d34",
        },
        vedique: {
          DEFAULT: "#1e3d34",
          dark: "#1e3d34",
          light: "#2a5448",
          subtle: "#f7f7f7",
          gold: "#c5a46d",
          cream: "#f7f7f7",
          surface: "#f7f7f7",
        },
        vediquegray: {
          DEFAULT: "#f7f7f7",
        },
        websecondary: {
          DEFAULT: "#c3f3d0",
        },
        webyellow: {
          DEFAULT: "#eab308",
        },
        webpink: {
          DEFAULT: "#db2777",
        },
        webtertiary: {
          DEFAULT: "#020202",
        },
        webvedique: {
          DEFAULT: "#1e3d34",
        },
        webblue: {
          DEFAULT: "#262862",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "slide-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        shine: {
          "0%": { transform: "translateX(-100%) rotate(45deg)" },
          "100%": { transform: "translateX(100%) rotate(45deg)" },
        },
        subtleShimmer: {
          "0%, 100%": {
            transform: "translateY(-10%) translateX(-10%)",
          },
          "50%": {
            transform: "translateY(10%) translateX(10%)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-left": "slide-left 20s linear infinite",
        "slide-right": "slide-right 20s linear infinite",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        shine: "shine 6s linear infinite",
        subtleShimmer: "subtleShimmer 8s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
