import React, { useState } from 'react';
import { ProfileData } from '@/shared/types';
import { Button } from '@/shared/components/atoms';
import { MapPin, Mail, Linkedin, Github, Copy, Check } from 'lucide-react';

interface ProfileHeaderProps {
    profile: ProfileData;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(profile.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="relative w-full pt-20 pb-16 bg-gradient-to-br from-background via-secondary/40 to-background text-status-teal overflow-hidden border-b border-status-gold/20">
            {/* High-End Decorative background blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-status-pink/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-status-gold/15 rounded-full translate-y-1/2 -translate-x-1/4 blur-[100px] pointer-events-none" />

            <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8 relative z-10">

                {/* Avatar with Gold status ring */}
                <div className="relative w-36 h-36 md:w-56 md:h-56 rounded-full overflow-hidden border-8 border-white shadow-2xl shadow-status-gold/20 transition-all hover:scale-[1.02] duration-700 ring-2 ring-status-gold/30">
                    <img
                        src={profile.avatarUrl}
                        alt={`Avatar de ${profile.name}`}
                        className="w-full h-full object-cover object-top bg-white/50 transition-all duration-700"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="%23F9EAC1" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
                        }}
                    />
                </div>

                {/* Info with Prestige Gold Typography */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-7xl font-heading font-black tracking-tighter text-status-teal drop-shadow-sm">
                        {profile.name}
                    </h1>
                    <div className="flex flex-col items-center space-y-3">
                        <h2 className="text-xl md:text-3xl text-status-goldText font-black tracking-[0.2em] uppercase">
                            {profile.title}
                        </h2>
                        <div className="flex items-center justify-center space-x-2 text-sm font-black text-status-teal/70 italic bg-white/50 px-4 py-1.5 rounded-full border border-status-gold/20">
                            <MapPin className="w-4 h-4 text-status-goldText" />
                            <span>{profile.university}</span>
                        </div>
                    </div>
                </div>

                {/* Skill Badges — Luxury Style */}
                <div className="flex flex-wrap justify-center gap-4">
                    {['Economía', 'Data Analytics', 'UNEMI', 'Ecuador'].map((tag) => (
                        <span key={tag} className="px-6 py-2 rounded-xl text-xs font-black uppercase tracking-[0.15em] bg-white border-2 border-status-gold/40 text-status-teal shadow-lg shadow-status-teal/5 hover:border-status-gold transition-all hover:scale-105">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Summary */}
                <p className="max-w-[750px] text-status-teal font-bold md:text-2xl leading-relaxed text-balance">
                    {profile.about}
                </p>

                {/* CTAs — Glamour Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-6 pt-10">
                    <div className="flex items-center bg-white rounded-full shadow-2xl shadow-status-gold/40 border border-status-gold/30 overflow-hidden">
                        <a
                            href={`mailto:${profile.email}?subject=Consulta%20Profesional%20-%20Portafolio%20Econ%C3%B3mico&body=Hola%20Karen,%20me%20gustar%C3%ADa%20contactarte%20sobre...`}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-status-gold text-status-teal font-black text-xs hover:bg-status-teal hover:text-white transition-all duration-500 uppercase tracking-[0.2em]"
                        >
                            <Mail className="w-5 h-5" />
                            Contactar
                        </a>
                        <button
                            onClick={copyToClipboard}
                            className="px-4 py-4 bg-white text-status-goldText hover:bg-status-gold/10 transition-colors border-l border-status-gold/30 group relative"
                            title="Copiar correo"
                        >
                            {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                            {copied && <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-status-teal text-white text-[10px] py-1 px-2 rounded-md animate-bounce">Copiado</span>}
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="w-12 h-12 rounded-full border-2 border-status-gold/40 flex items-center justify-center text-status-teal hover:bg-status-gold/10 hover:border-status-gold transition-all duration-300 shadow-lg"
                        >
                            <Linkedin className="w-6 h-6 text-status-goldText" />
                        </a>
                        <a
                            href={profile.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="w-12 h-12 rounded-full border-2 border-status-gold/40 flex items-center justify-center text-status-teal hover:bg-status-gold/10 hover:border-status-gold transition-all duration-300 shadow-lg"
                        >
                            <Github className="w-6 h-6 text-status-goldText" />
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
