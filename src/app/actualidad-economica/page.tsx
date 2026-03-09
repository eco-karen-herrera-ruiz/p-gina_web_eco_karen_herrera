'use client';

import React from 'react';
import { RootLayout } from '@/core/layouts/RootLayout';
import { YouTubeEmbed } from '@/shared/components/atoms';
import { TrendingUp, Calendar, Newspaper, ArrowRight, Share2, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function ActualidadEconomicaPage() {
    return (
        <RootLayout>
            <div className="bg-background min-h-screen">
                {/* Hero Section - Professional Analysis Header */}
                <section className="relative py-24 bg-gradient-to-br from-status-teal to-secondary/80 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-status-gold rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2" />
                    </div>
                    
                    <div className="container mx-auto px-4 md:px-8 relative z-10">
                        <div className="max-w-3xl space-y-6">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                                <TrendingUp className="w-4 h-4 text-status-gold" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Análisis de Mercado</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter italic leading-tight">
                                Actualidad <br />
                                <span className="text-status-gold">Económica</span>
                            </h1>
                            <p className="text-xl text-white/80 leading-relaxed font-medium max-w-2xl border-l-4 border-status-gold pl-8">
                                Explorando las dinámicas financieras y productivas que definen el presente y el futuro del Ecuador y la región.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content - Video Showcase */}
                <section className="py-24 -mt-12">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            
                            {/* Featured Analysis Video */}
                            <div className="lg:col-span-8 space-y-12">
                                <div className="bg-white p-6 md:p-10 rounded-[3.5rem] shadow-2xl border-2 border-status-gold/10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-status-teal rounded-2xl">
                                                <PlayCircle className="w-6 h-6 text-status-gold" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-heading font-black text-status-teal italic">Video de Análisis Semanal</h2>
                                                <div className="flex items-center gap-4 text-xs font-bold text-status-teal/40 uppercase tracking-widest mt-1">
                                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Marzo 2026</span>
                                                    <span className="flex items-center gap-1"><Newspaper className="w-3 h-3" /> Economía Real</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-status-goldText hover:text-status-teal transition-colors">
                                            <Share2 className="w-4 h-4" /> Compartir
                                        </button>
                                    </div>

                                    <YouTubeEmbed 
                                        videoId="rdhOyzXHx3c" 
                                        title="Análisis Económico con Karen Herrera Ruiz"
                                        className="shadow-inner"
                                    />

                                    <div className="mt-10 space-y-6">
                                        <p className="text-lg text-status-teal leading-relaxed font-medium">
                                            En esta entrega analizamos profundamente las variaciones de los indicadores económicos locales y cómo estos impactan directamente en la productividad del sector rural.
                                        </p>
                                        <div className="p-8 bg-secondary/20 rounded-3xl border border-status-gold/20 italic text-status-teal/80">
                                            "El análisis cuantitativo no es solo números; es la herramienta para entender las historias detrás de la economía familiar en Palenque y todo el Ecuador."
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar - Topics & Links */}
                            <div className="lg:col-span-4 space-y-8">
                                <div className="p-8 bg-status-teal rounded-[2.5rem] text-white space-y-6">
                                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-status-gold">Temas de Hoy</h3>
                                    <ul className="space-y-4">
                                        {[
                                            'Inflación y Canasta Básica',
                                            'Microfinanzas Rurales',
                                            'Impacto de la Economía Digital',
                                            'Políticas Públicas de Fomento'
                                        ].map((topic, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm font-bold group cursor-pointer hover:text-status-gold transition-colors">
                                                <ArrowRight className="w-4 h-4 text-status-gold group-hover:translate-x-1 transition-transform" />
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-8 border-2 border-dashed border-status-gold/30 rounded-[2.5rem] flex flex-col items-center text-center space-y-4">
                                    <div className="w-16 h-16 bg-status-gold/10 rounded-full flex items-center justify-center">
                                        <Newspaper className="w-8 h-8 text-status-gold" />
                                    </div>
                                    <h4 className="font-heading font-black text-status-teal italic">¿Quieres recibir mis informes?</h4>
                                    <p className="text-xs text-status-teal/60 font-medium">Suscríbete para recibir análisis detallados directamente en tu correo.</p>
                                    <Link href="mailto:kherrerar3@unemi.edu.ec" className="w-full py-3 bg-status-teal text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-status-gold hover:text-status-teal transition-all">
                                        Contactar
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </RootLayout>
    );
}
