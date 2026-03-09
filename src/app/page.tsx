'use client';

import React from 'react';
import { RootLayout } from '@/core/layouts/RootLayout';
import { ProfileHeader } from '@/features/profile-header';
import { useProfile } from '@/shared/hooks/useProfile';
import { Loader2, Target, Compass } from 'lucide-react';

import { YouTubeEmbed } from '@/shared/components/atoms';
import { Youtube, PlayCircle } from 'lucide-react';

export default function Home() {
    const { data: profile, loading, error } = useProfile();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Loader2 className="w-12 h-12 text-status-gold animate-spin" />
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="flex h-screen items-center justify-center bg-background text-destructive text-center p-6">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Error cargando perfil</h2>
                    <p>{error?.message || "Data not found"}</p>
                </div>
            </div>
        );
    }

    return (
        <RootLayout>
            <div id="about">
                <ProfileHeader profile={profile} />
            </div>

            {/* Identidad Estratégica: Misión y Visión */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-status-gold/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-stretch">
                        
                        {/* Misión */}
                        <div className="group p-10 md:p-12 rounded-[3rem] bg-gradient-to-br from-white to-secondary/10 border-2 border-status-gold/20 shadow-xl shadow-status-teal/5 transition-all hover:border-status-gold duration-500 flex flex-col space-y-6">
                            <div className="w-16 h-16 bg-status-teal rounded-2xl flex items-center justify-center shadow-lg shadow-status-teal/20 group-hover:scale-110 transition-transform duration-500">
                                <Target className="w-8 h-8 text-status-gold" />
                            </div>
                            <h3 className="text-3xl font-heading font-black text-status-teal tracking-tighter italic">Misión Profesional</h3>
                            <p className="text-lg text-status-teal/80 leading-relaxed font-medium">
                                Transformar la gestión económica de los sectores rurales de Ecuador mediante el <strong className="text-status-goldText">análisis de datos riguroso</strong> y la implementación de modelos de economía digital, promoviendo la transparencia y el desarrollo basado en evidencia desde mi formación en la UNEMI.
                            </p>
                            <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-status-goldText">
                                <div className="h-[2px] w-8 bg-status-gold" />
                                <span>Compromiso Digital</span>
                            </div>
                        </div>

                        {/* Visión */}
                        <div className="group p-10 md:p-12 rounded-[3rem] bg-white border-2 border-status-gold/20 shadow-xl shadow-status-teal/5 transition-all hover:border-status-gold duration-500 flex flex-col space-y-6">
                            <div className="w-16 h-16 bg-status-gold rounded-2xl flex items-center justify-center shadow-lg shadow-status-gold/20 group-hover:scale-110 transition-transform duration-500">
                                <Compass className="w-8 h-8 text-status-teal" />
                            </div>
                            <h3 className="text-3xl font-heading font-black text-status-teal tracking-tighter italic">Visión de Futuro</h3>
                            <p className="text-lg text-status-teal/80 leading-relaxed font-medium">
                                Ser un referente en la integración de la <strong className="text-status-goldText">economía cuantitativa</strong> y herramientas tecnológicas para el desarrollo sostenible, liderando proyectos que cierren la brecha de desigualdad y modernicen las estructuras económicas locales para el año 2030.
                            </p>
                            <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-status-goldText">
                                <div className="h-[2px] w-8 bg-status-gold" />
                                <span>Horizonte 2030</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Nueva Sección: Proyectos Destacados (Video) */}
            <section className="py-24 bg-background relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-8 max-w-5xl">
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-status-gold/10 rounded-full border border-status-gold/30">
                            <Youtube className="w-4 h-4 text-status-goldText" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-status-goldText">Canal Oficial</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-heading font-black text-status-teal italic tracking-tighter">
                            Investigación y Desarrollo
                        </h2>
                        <p className="text-status-teal/60 font-medium max-w-2xl mx-auto">
                            Explora mis análisis sobre la economía digital y el impacto de las nuevas tecnologías en el sector rural del Ecuador.
                        </p>
                    </div>

                    <div className="relative group">
                        {/* Decoración de fondo */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-status-gold/20 to-status-teal/20 rounded-[4rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        <div className="relative bg-white p-4 md:p-8 rounded-[3.5rem] shadow-2xl border-2 border-status-gold/10">
                            <YouTubeEmbed 
                                videoId="pRCQ_Fuyl74" 
                                title="Análisis de Economía Digital - Karen Herrera Ruiz"
                            />
                            
                            <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-status-teal/5 rounded-2xl">
                                        <PlayCircle className="w-6 h-6 text-status-teal" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-status-teal">Presentación de Proyecto</h4>
                                        <p className="text-xs text-status-teal/60 font-medium italic">Metodologías cuantitativas aplicadas</p>
                                    </div>
                                </div>
                                <div className="h-[1px] flex-1 bg-status-gold/20 hidden md:block mx-4" />
                                <div className="text-right">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-status-goldText block mb-1">Estatus</span>
                                    <span className="text-xs font-bold text-status-teal bg-secondary/30 px-3 py-1 rounded-full border border-status-gold/20 italic">Publicado · UNEMI</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-20 text-center border-t border-status-gold/10">
                <h2 className="text-xl font-heading font-black text-status-teal/40 italic">Sección de Proyectos y Publicaciones</h2>
                <p className="text-[10px] text-status-goldText font-bold uppercase tracking-[0.4em] mt-4">Arquitectura de Datos en Proceso</p>
            </main>
        </RootLayout>
    );
}
