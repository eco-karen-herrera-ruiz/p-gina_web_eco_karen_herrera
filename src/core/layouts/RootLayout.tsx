import React from 'react';
import { Mail, MapPin, Youtube, Linkedin, Github, Globe, ExternalLink, ShieldCheck, Facebook, ArrowUpRight, Menu, X } from 'lucide-react';
import { CookieBanner } from '@/shared/components/molecules';
import { EcoAssistant } from '@/features/assistant/components/AssistantChat';

interface RootLayoutProps {
    children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased flex flex-col">
            {/* Header — Executive Professional */}
            <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/90 backdrop-blur-xl shadow-nav">
                <div className="container flex items-center justify-between h-16 md:h-18">
                    {/* Logo */}
                    <a className="flex items-center gap-3 group" href="/">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-brand-navy group-hover:bg-brand-navy-light transition-colors duration-300">
                            <img src="/images/logo.png" alt="KH" className="h-8 w-auto object-contain brightness-0 invert" />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-sm md:text-base font-bold text-brand-navy tracking-tight">
                                Karen Herrera Ruiz
                            </span>
                            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
                                Economic Strategy
                            </span>
                        </div>
                    </a>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {[
                            { href: '/', label: 'Inicio' },
                            { href: '/about', label: 'Sobre Mí' },
                            { href: '/publicaciones', label: 'Publicaciones' },
                            { href: '/actualidad-economica', label: 'Análisis' },
                        ].map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="relative px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-neutral hover:text-brand-navy transition-colors duration-200 group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </a>
                        ))}
                        <a
                            href="/about"
                            className="ml-3 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-brand-navy text-white rounded-lg hover:bg-brand-navy-light transition-colors duration-200"
                        >
                            Contacto
                            <ArrowUpRight className="w-3 h-3" />
                        </a>
                    </nav>

                    {/* Mobile menu trigger (simplified) */}
                    <button className="md:hidden p-2 text-brand-navy">
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <main className="flex-1 w-full">
                {children}
            </main>

            <CookieBanner />
            <EcoAssistant />

            {/* Footer — Executive Professional */}
            <footer className="bg-brand-navy text-white">
                {/* Top accent line */}
                <div className="h-1 bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold" />

                <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16">
                        
                        {/* Column 1: Brand — spans 4 */}
                        <div className="lg:col-span-4 space-y-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-brand-gold flex items-center justify-center">
                                    <img src="/images/logo.png" alt="Logo" className="h-7 w-auto object-contain brightness-0" />
                                </div>
                                <div className="flex flex-col leading-tight">
                                    <span className="text-lg font-heading font-bold tracking-tight">
                                        Karen Herrera <span className="text-brand-gold">Ruiz</span>
                                    </span>
                                    <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-brand-gold/80">
                                        Economic Strategy
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed text-white/60 text-balance">
                                Análisis de dinámicas económicas y sociales mediante gestión de datos, aportando valor desde la investigación académica hasta la gobernanza local.
                            </p>
                            {/* Social icons */}
                            <div className="flex items-center gap-3 pt-2">
                                {[
                                    { href: 'https://www.linkedin.com/in/dayanna-herrera-3a912b38a', icon: Linkedin },
                                    { href: 'https://github.com/eco-karen-herrera-ruiz', icon: Github },
                                    { href: 'https://facebook.com/profile.php?id=61588392219336', icon: Facebook },
                                    { href: 'https://youtube.com/@eco_karen_herrera?si=83oczHeUpEswhcKm', icon: Youtube },
                                ].map(({ href, icon: Icon }) => (
                                    <a
                                        key={href}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-gold hover:border-brand-gold/30 hover:bg-brand-gold/10 transition-all duration-200"
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Column 2: Quick Links — spans 2 */}
                        <div className="lg:col-span-2 space-y-4">
                            <h4 className="text-brand-gold font-semibold uppercase tracking-[0.15em] text-[10px]">
                                Navegación
                            </h4>
                            <ul className="space-y-2.5">
                                {[
                                    { href: '/', label: 'Inicio' },
                                    { href: '/about', label: 'Sobre Mí' },
                                    { href: '/publicaciones', label: 'Publicaciones' },
                                    { href: '/actualidad-economica', label: 'Análisis Económico' },
                                ].map(({ href, label }) => (
                                    <li key={href}>
                                        <a href={href} className="text-sm text-white/55 hover:text-white transition-colors duration-200">
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Academic — spans 2 */}
                        <div className="lg:col-span-2 space-y-4">
                            <h4 className="text-brand-gold font-semibold uppercase tracking-[0.15em] text-[10px]">
                                Académico
                            </h4>
                            <ul className="space-y-2.5">
                                <li>
                                    <a href="https://orcid.org/0009-0008-8370-1801" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors duration-200">
                                        <Globe className="w-3.5 h-3.5 text-brand-gold" />
                                        <span>Registro ORCID</span>
                                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://youtube.com/@eco_karen_herrera" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors duration-200">
                                        <Youtube className="w-3.5 h-3.5 text-brand-gold" />
                                        <span>Canal YouTube</span>
                                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: Contact & Legal — spans 4 */}
                        <div className="lg:col-span-4 space-y-4">
                            <h4 className="text-brand-gold font-semibold uppercase tracking-[0.15em] text-[10px]">
                                Contacto & Legal
                            </h4>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm text-white/55">
                                    <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-white/80">EcoTech Herrera & Pérez S.A.S.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-white/55">
                                    <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                                    <span>Calle Manuel Antonio Muñoz Borrero, Vía Sinincay, Cuenca (Azuay), Ecuador</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-white/55">
                                    <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                                    <a href="mailto:kherrerar3@unemi.edu.ec" className="hover:text-white transition-colors">
                                        kherrerar3@unemi.edu.ec
                                    </a>
                                </li>
                                <li className="pt-3">
                                    <a
                                        href="https://wa.me/593986023149"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-gold text-brand-navy text-xs font-bold uppercase tracking-wider hover:bg-white transition-all duration-200 shadow-gold-glow"
                                    >
                                        WhatsApp
                                        <ArrowUpRight className="w-3 h-3" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-14 pt-7 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 text-[10px] font-medium uppercase tracking-wider text-white/30">
                            <a href="/legal/aviso-legal" className="hover:text-white/60 transition-colors">Aviso Legal</a>
                            <span className="text-white/10">·</span>
                            <a href="/legal/privacidad" className="hover:text-white/60 transition-colors">Privacidad</a>
                            <span className="text-white/10">·</span>
                            <a href="/legal/cookies" className="hover:text-white/60 transition-colors">Cookies</a>
                        </div>
                        <p className="text-[10px] font-medium text-white/25">
                            © {new Date().getFullYear()} Karen Herrera Ruiz · Todos los derechos reservados
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
