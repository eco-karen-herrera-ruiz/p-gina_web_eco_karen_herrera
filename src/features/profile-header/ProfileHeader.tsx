import React, { useState } from 'react';
import { ProfileData } from '@/shared/types';
import { MapPin, Mail, Linkedin, Github, Copy, Check, Award } from 'lucide-react';

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
        <section className="relative w-full text-white">
            <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                {/* Avatar */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-[3px] border-brand-gold/50 shadow-gold-glow transition-all hover:scale-[1.02] duration-500">
                    <img
                        src={profile.avatarUrl}
                        alt={`Avatar de ${profile.name}`}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="%23C8963E" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
                        }}
                    />
                </div>

                {/* Name & Title */}
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
                        {profile.name}
                    </h1>
                    <p className="text-brand-gold font-semibold tracking-[0.15em] uppercase text-sm md:text-base">
                        {profile.title}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-white/60">
                        <MapPin className="w-4 h-4 text-brand-gold" />
                        <span>{profile.university}</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2">
                    {['Economía', 'Data Analytics', 'UNEMI', 'Ecuador'].map((tag) => (
                        <span
                            key={tag}
                            className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] bg-white/10 border border-white/10 text-white/80 hover:bg-brand-gold/20 hover:border-brand-gold/40 transition-all"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Summary */}
                <p className="max-w-[700px] text-white/70 md:text-lg leading-relaxed text-balance">
                    {profile.about}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    <a
                        href={`mailto:${profile.email}?subject=Consulta%20Profesional&body=Hola%20Karen,%20me%20gustar%C3%ADa%20contactarte...`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold text-brand-navy text-sm font-bold hover:bg-white transition-all duration-200 shadow-gold-glow"
                    >
                        <Mail className="w-4 h-4" />
                        Contactar
                    </a>
                    <button
                        onClick={copyToClipboard}
                        className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/20 hover:text-white transition-all duration-200 relative"
                        title="Copiar correo"
                    >
                        {copied ? <Check className="w-4 h-4 text-brand-gold" /> : <Copy className="w-4 h-4" />}
                        {copied && (
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-navy text-[10px] py-1 px-3 rounded-lg font-bold">
                                ¡Copiado!
                            </span>
                        )}
                    </button>

                    <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-brand-gold/20 hover:border-brand-gold/40 transition-all"
                    >
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-brand-gold/20 hover:border-brand-gold/40 transition-all"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
