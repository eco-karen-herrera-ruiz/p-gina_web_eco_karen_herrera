'use client';

import React from 'react';
import { RootLayout } from '@/core/layouts/RootLayout';
import { Sprout, TrendingUp, Heart, Quote, ArrowRight } from 'lucide-react';

export default function AboutPage() {
    return (
        <RootLayout>
            <div className="bg-background min-h-screen">
                {/* Hero */}
                <section className="relative py-20 md:py-28 bg-navy-gradient text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] section-pattern" />
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />

                    <div className="container mx-auto px-4 md:px-8 relative z-10 text-center space-y-5">
                        <div className="inline-flex p-3 bg-white/10 rounded-2xl border border-white/10 mb-2">
                            <Sprout className="w-8 h-8 text-brand-gold" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight leading-tight">
                            Raíces en la Tierra,{' '}
                            <span className="text-brand-gold">Visión en el Futuro</span>
                        </h1>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                            Perfil Estudiantil · Universidad Estatal de Milagro
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <section className="pb-20 md:pb-28 -mt-8">
                    <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                        <div className="bg-white rounded-3xl shadow-card-hover border border-border/40 overflow-hidden">

                            {/* Quote */}
                            <div className="bg-brand-navy p-10 md:p-14 text-center relative overflow-hidden">
                                <Quote className="absolute top-6 left-6 w-20 h-20 text-white/[0.04]" />
                                <h2 className="text-xl md:text-2xl font-heading font-medium text-white/90 leading-relaxed relative z-10 text-balance italic">
                                    "Estudiar economía no es para mí un ejercicio solo teórico; es el compromiso de transformar la realidad de quienes, como mi familia, labran el futuro de Ecuador desde la ruralidad."
                                </h2>
                            </div>

                            <div className="p-8 md:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                                {/* Sidebar */}
                                <div className="lg:col-span-4 space-y-8">
                                    <div className="space-y-3">
                                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold border-b border-border pb-2">Origen</h3>
                                        <p className="text-brand-navy font-semibold">Palenque, Provincia de Los Ríos</p>
                                        <p className="text-xs text-brand-neutral-light">Cuna de agricultores y valores fundamentales.</p>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold border-b border-border pb-2">Estatus Actual</h3>
                                        <p className="text-brand-navy font-semibold text-sm">Economista en Formación · UNEMI</p>
                                        <p className="text-brand-gold font-bold text-[10px] uppercase tracking-wider bg-brand-gold/10 px-3 py-2 rounded-lg">
                                            Fundadora EcoTech Herrera & Pérez S.A.S.
                                        </p>
                                    </div>
                                    <div className="p-5 bg-background rounded-2xl border border-border/60">
                                        <Heart className="w-5 h-5 text-brand-gold mb-3" />
                                        <h4 className="text-sm font-bold text-brand-navy mb-2">Valores Guía</h4>
                                        <ul className="text-xs space-y-1.5 text-brand-neutral font-semibold">
                                            <li>· Ética Innegociable</li>
                                            <li>· Perseverancia Rural</li>
                                            <li>· Lucha Constante</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Main Text */}
                                <div className="lg:col-span-8 space-y-6 text-brand-neutral leading-relaxed">
                                    <p>
                                        En el corazón de la provincia de <strong className="text-brand-navy">Los Ríos</strong>, donde el verde de los campos se encuentra con el horizonte, nació una visión. Soy <strong className="text-brand-navy">Karen Dayanna Herrera Ruiz</strong>, y mi historia comienza en <strong className="text-brand-navy">Palenque</strong>, un cantón donde la economía no se lee en gráficos de bolsa, sino en los ciclos de la siembra y el esfuerzo diario de la agricultura.
                                    </p>
                                    <p>
                                        Hija de agricultores, crecí comprendiendo que la perseverancia es la única moneda que no se devalúa. Mis padres me heredaron el activo más valioso de mi patrimonio personal: <strong className="text-brand-navy">valores éticos y morales inquebrantables</strong>. Desde el campo, aprendí que la superación académica no es un destino individual, sino una herramienta de lucha colectiva.
                                    </p>

                                    <div className="py-6">
                                        <div className="h-[2px] w-16 bg-brand-gold mb-6" />
                                        <h3 className="text-2xl font-heading font-bold text-brand-navy mb-4 tracking-tight">
                                            La Academia como Catalizador
                                        </h3>
                                        <p>
                                            Como estudiante de <strong className="text-brand-navy">Economía en la Universidad Estatal de Milagro (UNEMI)</strong>, mi enfoque combina el rigor científico con la sensibilidad social. Mi proyección es clara: especializarme en el análisis de datos para diseñar soluciones que cierren la brecha de desigualdad en los sectores rurales del país.
                                        </p>
                                    </div>

                                    <p>
                                        Mi perfil combina la tenacidad del entorno rural con la agudeza del análisis cuantitativo moderno. No solo aspiro a entender las economías; aspiro a <strong className="text-brand-navy">transformarlas</strong>. Mi objetivo es convertir la realidad económica de los sectores olvidados en un ecosistema de oportunidades, productividad y desarrollo sostenible.
                                    </p>

                                    <div className="flex items-center gap-4 pt-8 border-t border-border">
                                        <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center">
                                            <TrendingUp className="w-5 h-5 text-brand-gold" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">Estatus Actual</span>
                                            <span className="text-sm font-bold text-brand-navy">Investigadora en Formación · UNEMI</span>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <a
                                            href="/publicaciones"
                                            className="inline-flex items-center gap-2 text-brand-gold text-sm font-bold hover:text-brand-navy transition-colors"
                                        >
                                            Ver publicaciones
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
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
