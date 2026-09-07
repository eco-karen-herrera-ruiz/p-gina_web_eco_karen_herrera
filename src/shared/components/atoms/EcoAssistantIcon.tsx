import React from 'react';

/**
 * Custom mark for EcoAssistant: a chat bubble with a small ascending bar-chart
 * inside, tying the assistant's identity to the site's economic-data theme
 * instead of a generic bot/sparkle icon. Drop-in replacement for a lucide icon
 * (accepts the same className/props).
 */
export function EcoAssistantIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
            <path d="M8 13v-2" />
            <path d="M12 13V8" />
            <path d="M16 13v-4" />
        </svg>
    );
}
