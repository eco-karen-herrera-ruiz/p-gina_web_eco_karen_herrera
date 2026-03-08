'use client';

import React from 'react';
import { RootLayout } from '@/core/layouts/RootLayout';
import { Sprout, TrendingUp, Heart, Quote, Map } from 'lucide-react';

export default function AboutPage() {
    return (
        <RootLayout>
            <div className="bg-background min-h-screen">
                {/* Hero Section - Storytelling Header */}
                <section className="relative py-24 bg-gradient-to-b from-secondary/30 to-background overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
                        <Map className="w-full h-full text-status-teal" strokeWidth={0.5} />
                    </div>
                    
                    <div className="container mx-auto px-4 md:px-8 relative z-10 text-center space-y-6">
                        <div className="inline-flex p-3 bg-white rounded-2xl shadow-xl shadow-status-gold/20 mb-4">
                            <Sprout className="w-8 h-8 text-status-goldText" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading font-black text-status-teal tracking-tighter italic leading-tight">
                            Raíces en la Tierra, <br />
                            <span className="text-status-goldText">Visión en el Futuro</span>
                        </h1>
                        <p className="text-xs font-black uppercase tracking-[0.4em] text-status-teal/60 max-w-2xl mx-auto">
                            Perfil Estudiantil · Universidad Estatal de Milagro
                        </p>
                    </div>
                </section>

                {/* Main Content - Press Note Style */}
                <section className="pb-24 -mt-12">
                    <div className="container mx-auto px-4 md:px-8 max-w-5xl">
                        <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-status-teal/10 border-2 border-status-gold/30 overflow-hidden">
                            
                            {/* Featured Quote */}
                            <div className="bg-status-teal p-10 md:p-16 text-center italic relative">
                                <Quote className="absolute top-8 left-8 w-16 h-16 text-white/10" />
                                <h2 className="text-2xl md:text-3xl font-heading font-medium text-white leading-relaxed relative z-10 text-balance">
                                    "Estudiar economía no es para mí un ejercicio solo teórico; es el compromiso de transformar la realidad de quienes, como mi familia, labran el futuro de Ecuador desde la ruralidad."
                                </h2>
                            </div>

                            <div className="p-8 md:p-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
                                
                                {/* Sidebar Info */}
                                <div className="lg:col-span-4 space-y-12">
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-status-goldText border-b border-status-gold pb-2">Origen</h3>
                                        <p className="text-status-teal font-bold">Palenque, Provincia de Los Ríos</p>
                                        <p className="text-sm text-status-teal/60 italic">Cuna de agricultores y valores fundamentales.</p>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-status-goldText border-b border-status-gold pb-2">Estatus Actual</h3>
                                        <p className="text-status-teal font-bold text-sm leading-tight">Economista en Formación · UNEMI</p>
                                        <p className="text-status-goldText font-black text-[10px] uppercase tracking-wider bg-status-gold/10 p-2 rounded-lg">Fundadora EcoTech Herrera & Pérez S.A.S.</p>
                                    </div>
                                    <div className="p-6 bg-secondary/20 rounded-3xl border-2 border-status-gold/20">
                                        <Heart className="w-6 h-6 text-status-pink mb-4" />
                                        <h4 className="text-sm font-black text-status-teal mb-2">Valores Guía</h4>
                                        <ul className="text-xs space-y-2 text-status-teal/70 font-bold uppercase tracking-wider">
                                            <li>• Ética Innegociable</li>
                                            <li>• Perseverancia Rural</li>
                                            <li>• Lucha Constante</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Main Text Content */}
                                <div className="lg:col-span-8 space-y-8 text-status-teal leading-relaxed text-lg font-medium text-pretty">
                                    <div className="space-y-6">
                                        <p>
                                            En el corazón de la provincia de <strong className="text-status-goldText">Los Ríos</strong>, donde el verde de los campos se encuentra con el horizonte, nació una visión. Soy <strong className="text-status-goldText">Karen Dayanna Herrera Ruiz</strong>, y mi historia comienza en <strong className="text-status-goldText">Palenque</strong>, un cantón donde la economía no se lee en gráficos de bolsa, sino en los ciclos de la siembra y el esfuerzo diario de la agricultura.
                                        </p>
                                        <p>
                                            Hija de agricultores, crecí comprendiendo que la perseverancia es la única moneda que no se devalúa. Mis padres me heredaron el activo más valioso de mi patrimonio personal: <strong className="text-status-goldText">valores éticos y morales inquebrantables</strong>. Desde el campo, aprendí que la superación académica no es un destino individual, sino una herramienta de lucha colectiva para alcanzar objetivos que trascienden fronteras locales.
                                        </p>
                                        
                                        <div className="py-8">
                                            <div className="h-[2px] w-24 bg-status-gold mb-8" />
                                            <h3 className="text-3xl font-heading font-black italic text-status-goldText mb-4 tracking-tighter">
                                                La Academia como catalizador
                                            </h3>
                                            <p>
                                                Como estudiante de <strong className="text-status-goldText">Economía en la Universidad Estatal de Milagro (UNEMI)</strong>, mi enfoque combina el rigor científico con la sensibilidad social. Mi proyección a futuro es clara: especializarme en el análisis de datos para diseñar soluciones que cierren la brecha de desigualdad que aún hoy castiga a los sectores rurales de nuestro país.
                                            </p>
                                        </div>

                                        <p>
                                            Mi perfil combina la tenacidad del entorno rural con la agudeza del análisis cuantitativo moderno. No solo aspiro a entender las economías; aspiro a <strong className="text-status-goldText">transformarlas</strong>. Mi objetivo es convertir la "triste realidad económica" de los sectores olvidados en un ecosistema de oportunidades, productividad y desarrollo sostenible.
                                        </p>
                                        
                                        <div className="flex items-center gap-6 pt-12 border-t border-status-gold/20">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black uppercase tracking-widest text-status-goldText">Estatus Actual</span>
                                                <span className="text-sm font-black">Investigadora en Formación · UNEMI</span>
                                            </div>
                                            <TrendingUp className="w-8 h-8 text-status-gold" />
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
