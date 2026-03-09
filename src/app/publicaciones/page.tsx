'use client';

import React from 'react';
import { RootLayout } from '@/core/layouts/RootLayout';
import { YouTubeEmbed } from '@/shared/components/atoms';
import { BookOpen, BrainCircuit, BarChart3, ArrowLeft, Share2, Quote, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function PublicacionesPage() {
    return (
        <RootLayout>
            <div className="bg-background min-h-screen">
                {/* Hero Section - Academic & Tech Header */}
                <section className="relative py-24 bg-status-teal overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-status-gold rounded-full blur-[160px]" />
                    </div>
                    
                    <div className="container mx-auto px-4 md:px-8 relative z-10 text-center space-y-8">
                        <Link 
                            href="/" 
                            className="inline-flex items-center gap-2 text-status-gold hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em] mb-4"
                        >
                            <ArrowLeft className="w-4 h-4" /> Volver al Inicio
                        </Link>
                        
                        <div className="space-y-4">
                            <div className="inline-flex p-4 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl">
                                <BookOpen className="w-8 h-8 text-status-gold" />
                            </div>
                            <h1 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter italic leading-tight">
                                Publicaciones <br />
                                <span className="text-status-gold">& Divulgación</span>
                            </h1>
                        </div>
                        
                        <p className="text-white/60 text-xs font-black uppercase tracking-[0.5em] max-w-2xl mx-auto">
                            Investigación · Tecnología · Prospectiva Económica
                        </p>
                    </div>
                </section>

                {/* Main Content - Academic Article Style */}
                <section className="py-24">
                    <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                        
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            
                            {/* Article Body */}
                            <div className="lg:col-span-8 space-y-12">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 text-status-goldText">
                                        <Sparkles className="w-5 h-5" />
                                        <span className="text-xs font-black uppercase tracking-widest">Análisis Global 2026-2027</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-heading font-black text-status-teal italic leading-tight tracking-tighter">
                                        Resiliencia Económica y el Auge de la IA
                                    </h2>
                                    <div className="flex items-center gap-6 py-4 border-y border-status-gold/10">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-status-goldText uppercase tracking-widest">Autor</span>
                                            <span className="text-sm font-bold text-status-teal">Karen Herrera Ruiz</span>
                                        </div>
                                        <div className="w-[1px] h-8 bg-status-gold/20" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-status-goldText uppercase tracking-widest">Lectura</span>
                                            <span className="text-sm font-bold text-status-teal">8 min aprox.</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Video Player */}
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-status-teal/5 rounded-[3.5rem] blur-2xl group-hover:bg-status-gold/5 transition-colors duration-700" />
                                    <YouTubeEmbed 
                                        videoId="5Z_0BSzTILw" 
                                        title="Resiliencia Económica e IA - Karen Herrera Ruiz"
                                        className="relative z-10 shadow-2xl border-2 border-status-gold/20"
                                    />
                                </div>

                                {/* Detailed Content */}
                                <div className="prose prose-lg max-w-none text-status-teal/80 font-medium leading-relaxed space-y-8">
                                    <p className="text-xl text-status-teal font-semibold italic border-l-4 border-status-gold pl-8">
                                        "El crecimiento económico mundial muestra una notable resiliencia, proyectándose una tasa del 3,3% para 2026 y del 3,2% para 2027."
                                    </p>
                                    
                                    <p>
                                        Esta estabilidad aparente es el resultado de fuerzas divergentes que se equilibran entre sí: mientras que los cambios en las políticas comerciales generan vientos en contra, el aumento de la inversión en tecnología, especialmente en <strong className="text-status-goldText">inteligencia artificial (IA)</strong>, junto con condiciones financieras acomodaticias, actúan como vientos a favor.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                                        <div className="p-8 bg-secondary/20 rounded-[2.5rem] border border-status-gold/20 space-y-4">
                                            <BrainCircuit className="w-10 h-10 text-status-gold" />
                                            <h4 className="font-heading font-black text-status-teal italic">Impulsores (IA)</h4>
                                            <p className="text-sm">La inversión masiva en infraestructuras de IA está redefiniendo la productividad global, compensando las fricciones comerciales.</p>
                                        </div>
                                        <div className="p-8 bg-status-teal text-white rounded-[2.5rem] space-y-4">
                                            <BarChart3 className="w-10 h-10 text-status-gold" />
                                            <h4 className="font-heading font-black italic text-status-gold">Proyecciones</h4>
                                            <p className="text-sm text-white/80">Estabilidad en torno al 3.3% con una convergencia de mercados emergentes hacia economías más digitalizadas.</p>
                                        </div>
                                    </div>

                                    <div className="bg-white p-10 rounded-[3rem] shadow-xl border-2 border-status-gold/5 relative overflow-hidden">
                                        <Quote className="absolute top-6 right-8 w-20 h-20 text-status-gold/10" />
                                        <p className="relative z-10 text-status-teal italic text-lg leading-relaxed">
                                            Como analistas, debemos observar con cautela cómo la tecnología compensa las barreras políticas. La IA no es solo una tendencia; es el amortiguador macroeconómico de esta década.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar - Related Content */}
                            <div className="lg:col-span-4 space-y-8">
                                <div className="sticky top-32 space-y-8">
                                    <div className="p-8 bg-white rounded-[2.5rem] border-2 border-status-gold/20 shadow-xl space-y-6">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-status-goldText">Ficha Técnica</h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center text-sm border-b border-status-gold/10 pb-2">
                                                <span className="text-status-teal/60 font-bold">Formato</span>
                                                <span className="text-status-teal font-black">Video / Ensayo</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm border-b border-status-gold/10 pb-2">
                                                <span className="text-status-teal/60 font-bold">Publicado</span>
                                                <span className="text-status-teal font-black">Marzo 2026</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-status-teal/60 font-bold">Idioma</span>
                                                <span className="text-status-teal font-black">Español</span>
                                            </div>
                                        </div>
                                        <button className="w-full flex items-center justify-center gap-2 py-4 bg-status-teal text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-status-gold hover:text-status-teal transition-all group">
                                            <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Compartir Hallazgos
                                        </button>
                                    </div>

                                    <div className="p-1 bg-gradient-to-br from-status-gold/50 to-status-pink/50 rounded-[2.5rem]">
                                        <div className="bg-white p-8 rounded-[2.4rem] space-y-4">
                                            <h4 className="text-sm font-black text-status-teal uppercase tracking-widest">Siguiente Tema</h4>
                                            <p className="text-xs text-status-teal/70 font-medium">Economía Circular en el Sector Bananero: Retos de la Agenda 2030.</p>
                                            <div className="flex items-center gap-2 text-[10px] font-black text-status-goldText uppercase tracking-widest pt-2">
                                                Proximamente <ArrowLeft className="w-3 h-3 rotate-180" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </RootLayout>
    );
}
