import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        tamil: ['Noto Sans Tamil', 'sans-serif'],
        display: ['DM Sans', 'sans-serif'],
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
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        jkkn: {
          green: "hsl(var(--jkkn-green))",
          "green-light": "hsl(var(--jkkn-green-light))",
          orange: "hsl(var(--jkkn-orange))",
          gold: "hsl(var(--jkkn-gold))",
          dark: "hsl(var(--jkkn-dark))",
        },
        premium: {
          navy: "hsl(var(--premium-navy))",
          "navy-light": "hsl(var(--premium-navy-light))",
          gold: "hsl(var(--premium-gold))",
          "gold-light": "hsl(var(--premium-gold-light))",
          orange: "hsl(var(--premium-orange))",
          cream: "hsl(var(--premium-cream))",
          "cream-dark": "hsl(var(--premium-cream-dark))",
        },
        fresh: {
          "green-bg": "#E8F5E9",
          "green-light": "#A5D6A7",
          "green-medium": "#2E7D32",
          "green-dark": "#1B5E20",
          "gold-light": "#FFF8E1",
          "gold-medium": "#FFD54F",
          "gold-dark": "#F59E0B",
          "gold-rich": "#B8860B",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        elevated: "var(--shadow-elevated)",
        glow: "var(--shadow-glow)",
        glass: "var(--shadow-glass)",
        premium: "var(--shadow-premium)",
      },
      backgroundImage: {
        'gradient-hero': "var(--gradient-hero)",
        'gradient-stats': "var(--gradient-stats)",
        'gradient-card': "var(--gradient-card)",
        'gradient-golden': "var(--gradient-golden)",
        'gradient-premium': "var(--gradient-premium)",
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
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "bounce-pop": {
          "0%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.12)" },
          "50%": { transform: "scale(0.95)" },
          "70%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        ticker: "ticker 30s linear infinite",
        "bounce-pop": "bounce-pop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
