import React from 'react';
import { RootLayout } from '@/core/layouts/RootLayout';
import { ShieldCheck, Scale, FileText, Lock } from 'lucide-react';

interface LegalPageProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

const LegalTemplate = ({ title, icon, children }: LegalPageProps) => (
    <RootLayout>
        <div className="bg-background min-h-screen py-20">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-status-teal/10 border-2 border-status-gold/20 overflow-hidden">
                    <div className="bg-status-teal p-12 text-center space-y-4">
                        <div className="inline-flex p-4 bg-status-gold/20 rounded-2xl mb-2">
                            {icon}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-black text-white tracking-tight italic">
                            {title}
                        </h1>
                        <p className="text-status-gold font-bold uppercase tracking-[0.3em] text-xs">
                            Transparencia & Cumplimiento Normativo (Ecuador)
                        </p>
                    </div>
                    <div className="p-8 md:p-16 prose prose-teal max-w-none text-status-teal font-medium leading-relaxed">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </RootLayout>
);

export default LegalTemplate;
