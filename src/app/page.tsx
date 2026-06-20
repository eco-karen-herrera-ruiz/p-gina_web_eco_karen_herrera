'use client';

import React from 'react';
import { RootLayout } from '@/core/layouts/RootLayout';
import { ProfileHeader } from '@/features/profile-header';
import { useProfile } from '@/shared/hooks/useProfile';
import { Loader2, Target, Compass, TrendingUp, BarChart3, ArrowRight, Youtube, PlayCircle, CheckCircle2 } from 'lucide-react';
import { YouTubeEmbed } from '@/shared/components/atoms';

export default function Home() {
    const { data: profile, loading, error } = useProfile();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-brand-navy border-t-brand-gold animate-spin" />
                    <span className="text-sm text-brand-neutral font-medium">Cargando perfil...</span>
                </div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="flex h-screen items-center justify-center bg-background text-center p-6">
                <div className="max-w-md space-y-3">
                    <div className="w-12 h-12 rounded-full bg-red-50 mx-auto flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-red-400" />
                    </div>
                    <h2 className="text-xl font-bold text-brand-navy">Error cargando perfil</h2>
                    <p className="text-sm text-brand-neutral">{error?.message || 'Datos no encontrados'}</p>
                </div>
            </div>
        );
    }

    return (
        <RootLayout>
            {/* Hero Section */}
            <section className="relative bg-navy-gradient text-white overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-[0.03] section-pattern" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

                <div className="container relative mx-auto px-4 md:px-8 pt-20 pb-16 md:pt-28 md:pb-24">
                    <div id="about">
                        <ProfileHeader profile={profile} />
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="relative -mt-10 pb-6">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { value: 'UNEMI', label: 'Formación Académica', icon: TrendingUp },
                            { value: 'Economía', label: 'Especialidad', icon: BarChart3 },
                            { value: 'Cuenca, EC', label: 'Ubicación', icon: Compass },
                            { value: '2030', label: 'Horizonte Estratégico', icon: Target },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover card-hover border border-border/50"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                                        <stat.icon className="w-4 h-4 text-brand-gold" />
                                    </div>
                                </div>
                                <div className="text-lg font-bold text-brand-navy">{stat.value}</div>
                                <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-neutral-light">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-14 md:mb-18 space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 rounded-full border border-brand-gold/20">
                            <Target className="w-3.5 h-3.5 text-brand-gold" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">Identidad Estratégica</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy tracking-tight">
                            Propósito y Proyección
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                        {/* Mission */}
                        <div className="group relative bg-background rounded-3xl p-8 md:p-10 border border-border/60 hover:border-brand-gold/40 transition-all duration-300">
                            <div className="absolute top-0 left-8 -translate-y-1/2 w-14 h-14 rounded-2xl bg-brand-navy flex items-center justify-center shadow-lg group-hover:bg-brand-navy-light transition-colors duration-300">
                                <Target className="w-7 h-7 text-brand-gold" />
                            </div>
                            <div className="mt-4 space-y-4">
                                <h3 className="text-xl font-heading font-bold text-brand-navy">Misión Profesional</h3>
                                <p className="text-sm leading-relaxed text-brand-neutral">
                                    Transformar la gestión económica de los sectores rurales de Ecuador mediante el{' '}
                                    <strong className="text-brand-navy">análisis de datos riguroso</strong> y la implementación de
                                    modelos de economía digital, promoviendo la transparencia y el desarrollo basado
                                    en evidencia desde mi formación en la UNEMI.
                                </p>
                                <div className="flex items-center gap-2 pt-2">
                                    <div className="h-[2px] w-8 bg-brand-gold" />
                                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-gold">Compromiso Digital</span>
                                </div>
                            </div>
                        </div>

                        {/* Vision */}
                        <div className="group relative bg-background rounded-3xl p-8 md:p-10 border border-border/60 hover:border-brand-gold/40 transition-all duration-300">
                            <div className="absolute top-0 left-8 -translate-y-1/2 w-14 h-14 rounded-2xl bg-brand-gold flex items-center justify-center shadow-lg group-hover:bg-brand-gold-light transition-colors duration-300">
                                <Compass className="w-7 h-7 text-brand-navy" />
                            </div>
                            <div className="mt-4 space-y-4">
                                <h3 className="text-xl font-heading font-bold text-brand-navy">Visión de Futuro</h3>
                                <p className="text-sm leading-relaxed text-brand-neutral">
                                    Ser un referente en la integración de la{' '}
                                    <strong className="text-brand-navy">economía cuantitativa</strong> y herramientas
                                    tecnológicas para el desarrollo sostenible, liderando proyectos que cierren la brecha
                                    de desigualdad y modernicen las estructuras económicas locales para el año 2030.
                                </p>
                                <div className="flex items-center gap-2 pt-2">
                                    <div className="h-[2px] w-8 bg-brand-navy" />
                                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-navy">Horizonte 2030</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Competencies */}
            <section className="py-16 md:py-24 bg-background section-pattern">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-14 space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-border/60">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-neutral-light">Competencias</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy tracking-tight">
                            Áreas de Especialización
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            { title: 'Análisis de Datos Económicos', desc: 'Modelado cuantitativo y visualización de indicadores macro y microeconómicos para la toma de decisiones.', delay: '0s' },
                            { title: 'Economía Digital', desc: 'Transformación digital de procesos económicos tradicionales, inclusión financiera y nuevos modelos de negocio.', delay: '0.1s' },
                            { title: 'Desarrollo Rural', desc: 'Estrategias basadas en evidencia para el crecimiento económico sostenible de comunidades rurales ecuatorianas.', delay: '0.2s' },
                            { title: 'Investigación Académica', desc: 'Publicaciones, papers y divulgación científica con rigor metodológico y estándares internacionales.', delay: '0.3s' },
                            { title: 'Políticas Públicas', desc: 'Análisis de impacto regulatorio y recomendaciones para la gobernanza económica local y nacional.', delay: '0.4s' },
                            { title: 'Consultoría Estratégica', desc: 'Asesoramiento a organizaciones en la integración de datos y tecnología para su crecimiento.', delay: '0.5s' },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover card-hover border border-border/40"
                                style={{ animationDelay: item.delay }}
                            >
                                <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center mb-4 group-hover:bg-brand-navy/10 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-brand-gold" />
                                </div>
                                <h3 className="font-bold text-brand-navy mb-2 text-sm">{item.title}</h3>
                                <p className="text-xs text-brand-neutral-light leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                    <div className="text-center mb-12 space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 rounded-full border border-brand-gold/20">
                            <Youtube className="w-3.5 h-3.5 text-brand-gold" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">Canal Oficial</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy tracking-tight">
                            Investigación y Desarrollo
                        </h2>
                        <p className="text-sm text-brand-neutral max-w-xl mx-auto">
                            Explora mis análisis sobre economía digital y el impacto de las nuevas tecnologías en el sector rural del Ecuador.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-brand-gold/10 to-brand-navy/10 rounded-[3rem] blur-xl opacity-60" />
                        <div className="relative bg-white rounded-3xl shadow-card-hover border border-border/40 overflow-hidden">
                            <YouTubeEmbed
                                videoId="pRCQ_Fuyl74"
                                title="Análisis de Economía Digital - Karen Herrera Ruiz"
                            />
                            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border/40">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center">
                                        <PlayCircle className="w-5 h-5 text-brand-navy" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-brand-navy text-sm">Presentación de Proyecto</h4>
                                        <p className="text-xs text-brand-neutral-light">Metodologías cuantitativas aplicadas</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-neutral-light">Estatus</span>
                                    <span className="text-xs font-semibold text-brand-navy bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
                                        Publicado · UNEMI
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-20 bg-navy-gradient text-white text-center">
                <div className="container mx-auto px-4 md:px-8 max-w-2xl space-y-6">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
                        ¿Colaboramos?
                    </h2>
                    <p className="text-white/60 text-sm max-w-lg mx-auto">
                        Abierta a proyectos de investigación, consultoría económica y colaboraciones académicas. Conversemos.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                        <a
                            href="/about"
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-gold text-brand-navy text-sm font-bold hover:bg-white transition-all duration-200 shadow-gold-glow"
                        >
                            Ver Perfil Completo
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href="/publicaciones"
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-white/20 text-white/80 text-sm font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                        >
                            Publicaciones
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>
        </RootLayout>
    );
}
