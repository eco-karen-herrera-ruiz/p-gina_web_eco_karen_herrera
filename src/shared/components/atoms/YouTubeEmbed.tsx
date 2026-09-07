'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface YouTubeEmbedProps {
    videoId: string;
    title?: string;
    className?: string;
}

/**
 * Click-to-load YouTube embed. Loading the real player eagerly pulls in
 * ~800KB of YouTube's own JS and sets third-party cookies before anyone
 * has asked to watch — this shows a static thumbnail (from i.ytimg.com,
 * a domain we already preconnect to) and only mounts the iframe once
 * the visitor clicks play.
 */
export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
    videoId,
    title = "YouTube Video Player",
    className
}) => {
    const [loaded, setLoaded] = useState(false);

    if (loaded) {
        return (
            <div className={cn("relative w-full aspect-video overflow-hidden bg-black/5", className)}>
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&autoplay=1`}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
                "group relative w-full aspect-video overflow-hidden bg-black",
                className
            )}
        >
            <img
                src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-brand-navy/10 transition-colors" />
            <div className="relative z-10 h-full flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white group-hover:scale-105 transition-all duration-300 shadow-xl">
                    <Play className="w-7 h-7 md:w-8 md:h-8 text-brand-navy ml-1" fill="currentColor" />
                </div>
            </div>
        </button>
    );
};
