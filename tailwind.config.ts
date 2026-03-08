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
                border: "#F9EAC1", // Gold border for status
                input: "hsl(var(--input))",
                ring: "#F9EAC1",
                background: {
                    DEFAULT: "#FDD4E3", // Soft Pink background
                    section: "#C8EDED", // Light Cyan section
                    card: "#FFFFFF",
                },
                foreground: "#0F2926", // Ultra Dark Teal for main text
                primary: {
                    DEFAULT: "#FDB3CA", // Medium Pink (Actions)
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#C8EDED", // Light Cyan
                    foreground: "#0F2926",
                },
                accent: {
                    DEFAULT: "#F9EAC1", // Status Gold
                    foreground: "#0F2926",
                },
                status: {
                    gold: "#F9EAC1", // Light gold for borders
                    goldText: "#926F34", // Bronze/Dark Gold for status text
                    teal: "#0F2926", // Deep professional teal
                    pink: "#FDB3CA",
                },
                text: {
                    primary: "#0F2926", 
                    muted: "#4A6B68",
                    gold: "#926F34", // Darker gold for readability
                },
            },
            borderRadius: {
                "3xl": "1.5rem",
                "2xl": "1rem",
                xl: "0.75rem",
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-dm-sans)"],
                heading: ["var(--font-playfair)"],
                mono: ["var(--font-dm-mono)"],
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
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
