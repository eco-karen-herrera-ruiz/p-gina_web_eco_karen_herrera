import React from 'react';
import { RootLayout } from '@/core/layouts/RootLayout';

interface LegalPageProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

const LegalTemplate = ({ title, icon, children }: LegalPageProps) => (
    <RootLayout>
        <div className="bg-background min-h-screen py-16">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                <div className="bg-white rounded-3xl shadow-card-hover border border-border/40 overflow-hidden">
                    <div className="bg-brand-navy p-10 md:p-12 text-center space-y-4">
                        <div className="inline-flex p-4 bg-white/10 rounded-2xl border border-white/10">
                            {icon}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white tracking-tight">
                            {title}
                        </h1>
                        <p className="text-brand-gold font-semibold uppercase tracking-[0.2em] text-[10px]">
                            Transparencia & Cumplimiento Normativo (Ecuador)
                        </p>
                    </div>
                    <div className="p-8 md:p-14 max-w-none text-brand-neutral leading-relaxed">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </RootLayout>
);

export default LegalTemplate;
