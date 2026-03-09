import React from 'react';
import { cn } from '@/shared/utils/cn';

interface YouTubeEmbedProps {
    videoId: string;
    title?: string;
    className?: string;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ 
    videoId, 
    title = "YouTube Video Player",
    className 
}) => {
    return (
        <div className={cn(
            "relative w-full aspect-video rounded-[2.5rem] overflow-hidden border-2 border-status-gold/20 shadow-xl shadow-status-teal/5 bg-black/5",
            className
        )}>
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
            />
        </div>
    );
};
