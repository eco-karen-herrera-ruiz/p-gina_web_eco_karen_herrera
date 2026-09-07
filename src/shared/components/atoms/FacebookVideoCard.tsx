'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface FacebookVideoCardProps {
    videoUrl: string;
    title: string;
    thumbnail?: string;
    className?: string;
}

/**
 * Facebook video, click-to-load. Renders a static placeholder (no
 * network/iframe cost) until clicked, then swaps in the real embed —
 * avoids paying Facebook SDK weight for videos the visitor never plays.
 */
export const FacebookVideoCard: React.FC<FacebookVideoCardProps> = ({ videoUrl, title, thumbnail, className }) => {
    const [loaded, setLoaded] = useState(false);

    if (loaded) {
        const src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=false&width=560`;
        return (
            <div className={cn('relative w-full aspect-video overflow-hidden bg-black/5', className)}>
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={src}
                    title={title}
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                />
            </div>
        );
    }

    return (
        <button
            onClick={() => setLoaded(true)}
            aria-label={`Reproducir video: ${title}`}
            className={cn(
                'group relative w-full aspect-video overflow-hidden bg-navy-gradient flex items-center justify-center',
                className
            )}
        >
            {thumbnail ? (
                <img
                    src={thumbnail}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                />
            ) : (
                <div className="absolute inset-0 opacity-[0.05] section-pattern" />
            )}
            <div className="absolute inset-0 bg-brand-navy/30 group-hover:bg-brand-navy/15 transition-colors" />
            <div className="relative z-10 w-16 h-16 rounded-full bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center group-hover:bg-brand-gold/25 group-hover:scale-105 transition-all duration-300">
                <Play className="w-6 h-6 text-brand-gold ml-1" fill="currentColor" />
            </div>
            <span className="absolute bottom-4 left-4 right-4 text-[10px] font-bold uppercase tracking-widest text-white/70">
                Reproducir en Facebook
            </span>
        </button>
    );
};
