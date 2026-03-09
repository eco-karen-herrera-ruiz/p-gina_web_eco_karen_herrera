import React from 'react';
import { Mail, MapPin, Youtube, Linkedin, Github, Globe, ExternalLink, ShieldCheck, Facebook } from 'lucide-react';
import { CookieBanner } from '@/shared/components/molecules';
import { EcoAssistant } from '@/features/assistant/components/AssistantChat';

interface RootLayoutProps {
    children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased flex flex-col">
            {/* Header — Prestige Identity */}
            <header className="sticky top-0 z-50 w-full border-b-2 border-status-gold bg-white/95 backdrop-blur-md shadow-xl shadow-status-teal/5">
                <div className="container flex flex-col md:flex-row min-h-[6.5rem] py-4 md:py-0 items-center justify-between gap-4">
                    <div className="flex w-full md:w-auto items-center justify-center md:justify-start">
                        <a className="flex items-center space-x-4 group" href="/">
                            <div className="p-2.5 bg-gradient-to-tr from-status-pink/20 to-status-gold/50 rounded-2xl group-hover:scale-105 transition-transform duration-500 shadow-inner">
                                <img src="/images/logo.png" alt="Eco. KH Logo" className="h-12 w-auto rounded-sm object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-heading font-black text-2xl text-status-teal tracking-tight">
                                    Karen Herrera Ruiz
                                </span>
                                <span className="text-[0.7rem] font-black uppercase tracking-[0.25em] text-status-goldText">
                                    Economic & Data Strategy
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className="flex items-center justify-center w-full md:w-auto">
                        <nav className="flex items-center text-xs font-black uppercase tracking-[0.2em] text-status-teal space-x-6 md:space-x-12">
                            <a href="/" className="hover:text-status-goldText transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2.5px] after:bg-status-goldText hover:after:w-full after:transition-all">Inicio</a>
                            <a href="/about" className="hover:text-status-goldText transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2.5px] after:bg-status-goldText hover:after:w-full after:transition-all">Sobre Mí</a>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full">
                {children}
            </main>

            <CookieBanner />
            <EcoAssistant />

            {/* Footer — High Contrast Academic Prestige (CIDOB Inspired) */}
            <footer className="bg-status-teal text-white border-t-8 border-status-gold pt-20 pb-10">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        
                        {/* Column 1: Identity & Mission */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-white/10 rounded-xl border border-status-gold/30 backdrop-blur-sm shadow-lg shadow-status-gold/5">
                                    <img src="/images/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-heading font-bold tracking-wider leading-tight">Karen Herrera <span className="text-status-gold">Ruiz</span></span>
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-status-gold/80">Economic Strategy</span>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed text-white/70 text-balance">
                                Basada en los criterios de excelencia y rigor analítico, mi objetivo es el análisis de las dinámicas económicas y sociales mediante la gestión de datos, aportando valor desde la investigación académica hasta la gobernanza local.
                            </p>
                            <div className="flex items-center gap-4">
                                <a href="https://linkedin.com/in/karenherrera" target="_blank" className="text-status-gold hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                                <a href="https://github.com/eco-karen-herrera-ruiz" target="_blank" className="text-status-gold hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                                <a href="https://facebook.com/profile.php?id=61588392219336" target="_blank" className="text-status-gold hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                                <a href="https://x.com/EcKaren_Herrera" target="_blank" className="text-status-gold hover:text-white transition-colors">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                    </svg>
                                </a>
                                <a href="https://youtube.com/@eco_karen_herrera?si=83oczHeUpEswhcKm" target="_blank" className="text-status-gold hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
                                <a href="https://www.tiktok.com/@eco_karen_herrera?is_from_webapp=1&sender_device=pc" target="_blank" className="text-status-gold hover:text-white transition-colors">
                                    <svg 
                                        viewBox="0 0 24 24" 
                                        fill="currentColor" 
                                        className="w-5 h-5"
                                    >
                                        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.617a8.171 8.171 0 0 0 4.773 1.574V6.747a4.363 4.363 0 0 1-1.003-.061z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Column 2: Academic Ecosystem */}
                        <div className="space-y-6">
                            <h3 className="text-status-gold font-black uppercase tracking-[0.2em] text-xs">Ecosistema Académico</h3>
                            <ul className="space-y-4">
                                <li>
                                    <a href="https://orcid.org/0009-0008-8370-1801" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-sm font-bold text-white/80 hover:text-status-gold transition-colors">
                                        <Globe className="w-4 h-4 text-status-gold" />
                                        <span>Registro ORCID</span>
                                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://youtube.com/@eco_karen_herrera?si=83oczHeUpEswhcKm" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-sm font-bold text-white/80 hover:text-status-gold transition-colors">
                                        <Youtube className="w-4 h-4 text-status-gold" />
                                        <span>Canal de Divulgación</span>
                                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: Quick Links */}
                        <div className="space-y-6">
                            <h3 className="text-status-gold font-black uppercase tracking-[0.2em] text-xs">Investigación</h3>
                            <ul className="space-y-3 text-sm font-bold text-white/60">
                                <li><a href="/about" className="hover:text-white transition-colors">Sobre Mí</a></li>
                                <li><a href="/publicaciones" className="hover:text-white transition-colors">Publicaciones</a></li>
                                <li><a href="/actualidad-economica" className="hover:text-white transition-colors">Actualidad Económica</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Actividades Académicas</a></li>
                            </ul>
                        </div>

                        {/* Column 4: Contact & Location */}
                        <div className="space-y-6">
                            <h3 className="text-status-gold font-black uppercase tracking-[0.2em] text-xs">Información Legal EcoTech</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-sm text-white/70">
                                    <ShieldCheck className="w-4 h-4 text-status-gold shrink-0 mt-1" />
                                    <div className="flex flex-col">
                                        <span className="font-bold text-white">EcoTech Herrera & Pérez S.A.S.</span>
                                        <span className="text-[10px] uppercase tracking-widest text-status-gold">RUC: (13 DÍGITOS)</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-white/70">
                                    <MapPin className="w-4 h-4 text-status-gold shrink-0 mt-1" />
                                    <span>Calle Manuel Antonio Muñoz Borrero, Vía Sinincay, Cuenca (Azuay), Ecuador</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-white/70">
                                    <Mail className="w-4 h-4 text-status-gold shrink-0" />
                                    <a href="mailto:kherrerar3@unemi.edu.ec" className="hover:text-white">kherrerar3@unemi.edu.ec</a>
                                </li>
                                <li className="flex items-center gap-6 mt-4 pt-4 border-t border-white/10">
                                    <a 
                                        href="https://wa.me/593986023149?text=%C2%A1Hola%20Karen!%20Deseo%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20EcoTech." 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-status-gold text-status-teal font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-lg"
                                    >
                                        WhatsApp EcoTech
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar: Ethics & Privacy */}
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
                            <a href="#" className="hover:text-status-gold transition-colors flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> Canal Ético</a>
                            <a href="/legal/aviso-legal" className="hover:text-status-gold transition-colors">Aviso Legal</a>
                            <a href="/legal/privacidad" className="hover:text-status-gold transition-colors">Privacidad</a>
                            <a href="/legal/cookies" className="hover:text-status-gold transition-colors">Cookies</a>
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                            © {new Date().getFullYear()} Karen Herrera Ruiz · Fundación Académica Senior
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
