'use client';

import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-6 right-6 z-[100] md:left-auto md:max-w-md animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="bg-white/95 backdrop-blur-md border border-border p-5 rounded-2xl shadow-card-hover relative overflow-hidden">
                <div className="flex items-start gap-3 relative z-10">
                    <div className="p-2.5 bg-brand-gold/10 rounded-xl shrink-0">
                        <Cookie className="w-5 h-5 text-brand-gold" />
                    </div>

                    <div className="space-y-3 flex-1">
                        <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                            Privacidad & Datos
                        </h4>
                        <p className="text-xs leading-relaxed text-brand-neutral">
                            Usamos cookies para mejorar tu experiencia y analizar el tráfico de este portafolio académico. ¿Aceptas?
                        </p>

                        <div className="flex gap-2 pt-1">
                            <button
                                onClick={handleAccept}
                                className="flex-1 px-4 py-2 bg-brand-navy text-white text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-brand-navy-light transition-colors"
                            >
                                Aceptar
                            </button>
                            <button
                                onClick={handleDecline}
                                className="flex-1 px-4 py-2 bg-white border border-border text-brand-neutral-light text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-background transition-colors"
                            >
                                Esenciales
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-brand-neutral-light/40 hover:text-brand-navy transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
