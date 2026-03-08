'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, Cookie } from 'lucide-react';

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user already gave consent
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Show with a small delay for better UX
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
            <div className="bg-white/95 backdrop-blur-md border-2 border-status-gold p-6 rounded-[2rem] shadow-2xl shadow-status-teal/20 relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-status-pink/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                
                <div className="flex items-start gap-4 relative z-10">
                    <div className="p-3 bg-status-gold/20 rounded-2xl shrink-0">
                        <Cookie className="w-6 h-6 text-status-goldText" />
                    </div>
                    
                    <div className="space-y-3">
                        <h4 className="text-sm font-black text-status-teal uppercase tracking-widest flex items-center gap-2">
                            Privacidad & Datos
                        </h4>
                        <p className="text-[13px] leading-relaxed text-status-teal/80 font-medium">
                            Usamos cookies para mejorar tu <span className="text-status-goldText font-bold">experiencia profesional</span> y analizar el tráfico académico de este portafolio. ¿Aceptas el uso de estas herramientas?
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                                onClick={handleAccept}
                                className="flex-1 px-6 py-2.5 bg-status-teal text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-status-gold hover:text-status-teal transition-all shadow-lg shadow-status-teal/20"
                            >
                                Aceptar Todo
                            </button>
                            <button
                                onClick={handleDecline}
                                className="flex-1 px-6 py-2.5 bg-white border-2 border-status-gold/30 text-status-goldText text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-status-pink/10 transition-all"
                            >
                                Solo Esenciales
                            </button>
                        </div>
                        
                        <p className="text-[9px] text-center text-status-teal/40 font-bold uppercase tracking-tighter">
                            Cumplimiento con LOPDP (Ecuador) & GDPR
                        </p>
                    </div>

                    <button 
                        onClick={() => setIsVisible(false)}
                        className="text-status-teal/30 hover:text-status-teal transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
