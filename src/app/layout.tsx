import type { Metadata } from "next";
import { headers } from "next/headers";
import { DM_Sans, Playfair_Display, DM_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});

const dmMono = DM_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-dm-mono",
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ecokarenherrera.dpdns.org';

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: "Karen Herrera Ruiz | Portafolio Profesional",
    description: "Portafolio digital de Karen Herrera Ruiz, economista y analista de datos de la UNEMI.",
    openGraph: {
        title: "Karen Herrera Ruiz | Portafolio Profesional",
        description: "Portafolio digital de Karen Herrera Ruiz, economista y analista de datos de la UNEMI.",
        url: baseUrl,
        siteName: "Karen Herrera Ruiz",
        locale: "es_EC",
        type: "website",
        images: [{ url: "/images/og-cover.png", width: 1200, height: 630, alt: "Karen Herrera Ruiz — Economista en Formación, UNEMI" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Karen Herrera Ruiz | Portafolio Profesional",
        description: "Portafolio digital de Karen Herrera Ruiz, economista y analista de datos de la UNEMI.",
        images: ["/images/og-cover.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Reading the nonce here opts this render into per-request (dynamic) rendering,
    // which is required for Next to thread the CSP nonce (set in middleware.ts) into
    // its own inline hydration scripts.
    headers().get('x-nonce');

    return (
        <html lang="es" className={`${dmSans.variable} ${playfair.variable} ${dmMono.variable}`}>
            <body className="min-h-screen bg-background font-sans antialiased">
                {children}
            </body>
        </html>
    );
}
