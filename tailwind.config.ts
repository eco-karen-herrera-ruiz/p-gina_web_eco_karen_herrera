import type { Config } from "tailwindcss"

const config = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
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
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: {
                    DEFAULT: "hsl(var(--background))",
                    alt: "#EEF0F2",
                    section: "#F4F5F6",
                },
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                    light: "#1A3447",
                    lighter: "#2A4A5E",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                    light: "#E8D5B0",
                    lighter: "#F5ECD7",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                /* Executive brand tokens */
                brand: {
                    navy: "#0F1E2D",
                    "navy-light": "#1A3447",
                    gold: "#C8963E",
                    "gold-light": "#E8D5B0",
                    white: "#FFFFFF",
                    "off-white": "#F8F9FA",
                    neutral: "#4A5568",
                    "neutral-light": "#7B8A9B",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
                xl: "0.75rem",
                "2xl": "1rem",
                "3xl": "1.25rem",
                "4xl": "1.5rem",
            },
            fontFamily: {
                sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
                heading: ["var(--font-playfair)", "Georgia", "serif"],
                mono: ["var(--font-dm-mono)", "monospace"],
            },
            boxShadow: {
                'card': '0 1px 3px rgba(15, 30, 45, 0.06), 0 1px 2px rgba(15, 30, 45, 0.04)',
                'card-hover': '0 10px 25px rgba(15, 30, 45, 0.08), 0 4px 8px rgba(15, 30, 45, 0.04)',
                'nav': '0 1px 0 rgba(15, 30, 45, 0.06)',
                'gold-glow': '0 0 20px rgba(200, 150, 62, 0.15)',
            },
            keyframes: {
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "slide-in-right": {
                    "0%": { opacity: "0", transform: "translateX(20px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
            },
            animation: {
                "fade-in-up": "fade-in-up 0.6s ease-out both",
                "fade-in": "fade-in 0.5s ease-out both",
                "slide-in-right": "slide-in-right 0.5s ease-out both",
            },
            backgroundImage: {
                'navy-gradient': 'linear-gradient(135deg, #0F1E2D 0%, #1A3447 100%)',
                'gold-gradient': 'linear-gradient(135deg, #C8963E 0%, #D4A94E 100%)',
                'section-gradient': 'linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 100%)',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
