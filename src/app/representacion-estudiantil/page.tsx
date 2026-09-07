'use client';

import React from 'react';
import { RootLayout } from '@/core/layouts/RootLayout';
import {
    Vote,
    Target,
    Users,
    MessageCircle,
    Award,
    CheckCircle2,
    ArrowRight,
    Calendar,
    ShieldCheck,
    GraduationCap,
    Handshake,
} from 'lucide-react';

const propuestas = [
    {
        icon: MessageCircle,
        title: 'Canal de comunicación directa y con seguimiento',
        desc: 'Un espacio estructurado y trazable para llevar las inquietudes del curso a docentes y coordinación — sin que se pierdan en el camino.',
    },
    {
        icon: CheckCircle2,
        title: 'Reportes periódicos de seguimiento',
        desc: 'Cada mes, un resumen breve al curso: qué se planteó, qué se resolvió y qué sigue pendiente. Representación medible, no promesas sueltas.',
    },
    {
        icon: Users,
        title: 'Espacios de acompañamiento entre compañeros',
        desc: 'Organizar sesiones de apoyo antes de exámenes y entregas clave, usando la misma disciplina de organización con la que gestiono mis propios proyectos.',
    },
];

const pilares = [
    {
        icon: Award,
        title: 'Competencia',
        desc: 'Promedio de 97.83, primera posición de candidatura, fundadora de EcoTech Herrera & Pérez S.A.S. Trayectoria verificable, no autopercepción.',
    },
    {
        icon: ShieldCheck,
        title: 'Integridad',
        desc: 'Trato respetuoso y consistente con docentes y compañeros, dentro y fuera del aula. La misma conducta en público que en privado.',
    },
    {
        icon: Handshake,
        title: 'Cercanía',
        desc: 'Disponible para escuchar antes de proponer. Una representación construida sobre lo que el curso necesita, no sobre una agenda personal.',
    },
];

export default function RepresentacionEstudiantilPage() {
    return (
        <RootLayout>
            <div className="bg-background min-h-screen">
                {/* Hero */}
                <section className="relative py-20 md:py-28 bg-navy-gradient text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] section-pattern" />
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />

                    <div className="container mx-auto px-4 md:px-8 relative z-10 text-center space-y-5 max-w-3xl">
                        <div className="inline-flex p-3 bg-white/10 rounded-2xl border border-white/10 mb-2">
                            <Vote className="w-8 h-8 text-brand-gold" />
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                            Proceso de Elección · Representante Estudiantil · UNEMI
                        </p>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight leading-tight">
                            Representación con{' '}
                            <span className="text-brand-gold">seriedad y resultados</span>
                        </h1>
                        <p className="text-white/70 text-base md:text-lg leading-relaxed">
                            Candidatura a representante estudiantil, 2do nivel C2. Una propuesta construida sobre disciplina académica, organización y trato respetuoso — no sobre promesas vacías.
                        </p>
                        <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 text-xs font-bold uppercase tracking-wider">
                                <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                                Votaciones: 7 – 9 de septiembre
                            </div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/15 rounded-full border border-brand-gold/30 text-xs font-bold uppercase tracking-wider text-brand-gold">
                                Posición de candidatura: 1 · Promedio 97.83
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pilares: Competencia, Integridad, Cercanía */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="text-center mb-14 space-y-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 rounded-full border border-brand-gold/20">
                                <GraduationCap className="w-3.5 h-3.5 text-brand-gold" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-goldText">Por qué esta candidatura</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy tracking-tight">
                                Tres cosas que no van a cambiar
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {pilares.map((p) => (
                                <div key={p.title} className="group bg-background rounded-3xl p-8 border border-border/60 hover:border-brand-gold/40 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-2xl bg-brand-navy flex items-center justify-center mb-5 group-hover:bg-brand-navy-light transition-colors">
                                        <p.icon className="w-6 h-6 text-brand-gold" />
                                    </div>
                                    <h3 className="text-lg font-heading font-bold text-brand-navy mb-2">{p.title}</h3>
                                    <p className="text-sm text-brand-neutral leading-relaxed">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Propuestas concretas */}
                <section className="py-16 md:py-24 bg-background section-pattern">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="text-center mb-14 space-y-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-border/60">
                                <Target className="w-3.5 h-3.5 text-brand-gold" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-neutral-light">Propuestas</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy tracking-tight">
                                Tres compromisos concretos
                            </h2>
                            <p className="text-sm text-brand-neutral max-w-xl mx-auto">
                                Pocas propuestas, claras y verificables — no una lista larga de buenas intenciones.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {propuestas.map((p) => (
                                <div key={p.title} className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover card-hover border border-border/40">
                                    <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-4">
                                        <p.icon className="w-5 h-5 text-brand-gold" />
                                    </div>
                                    <h3 className="font-bold text-brand-navy mb-2 text-sm">{p.title}</h3>
                                    <p className="text-xs text-brand-neutral-light leading-relaxed">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Cita personal */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="container mx-auto px-4 md:px-8 max-w-3xl">
                        <div className="bg-brand-navy rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
                            <h2 className="text-xl md:text-2xl font-heading font-medium text-white/90 leading-relaxed relative z-10 text-balance italic">
                                "No pido el voto por ser la mejor nota del curso. Lo pido porque sé organizar, sé escuchar y sostengo lo que digo — dentro y fuera del aula."
                            </h2>
                            <p className="mt-6 text-brand-gold text-xs font-bold uppercase tracking-[0.2em]">Karen Dayanna Herrera Ruiz</p>
                        </div>
                    </div>
                </section>

                {/* CTA de votación */}
                <section className="py-16 md:py-20 bg-navy-gradient text-white text-center">
                    <div className="container mx-auto px-4 md:px-8 max-w-2xl space-y-6">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
                            Las votaciones son del 7 al 9 de septiembre
                        </h2>
                        <p className="text-white/60 text-sm max-w-lg mx-auto">
                            Tu voto se registra en el Sistema de Gestión Académica (SGA) de la UNEMI, en el módulo Proceso Estudiantil.
                        </p>
                        <div className="pt-2">
                            <a
                                href="https://sgaestudiante.unemi.edu.ec/alu_procesoestudiantil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 px-10 py-4 rounded-xl bg-brand-gold text-brand-navy text-sm font-bold uppercase tracking-wide hover:bg-white transition-all duration-200 shadow-gold-glow"
                            >
                                <Vote className="w-5 h-5" />
                                Votar Ahora en el SGA
                            </a>
                            <p className="text-white/40 text-[11px] mt-2.5">Inicia sesión con tu cuenta institucional UNEMI</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <a
                                href="https://wa.me/593986023149"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-white/20 text-white/80 text-sm font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                            >
                                Escribir por WhatsApp
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <a
                                href="/about"
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-white/20 text-white/80 text-sm font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                            >
                                Conocer mi trayectoria
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </RootLayout>
    );
}
