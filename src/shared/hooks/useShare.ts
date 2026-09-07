'use client';

import { useState } from 'react';

/**
 * Shares the current page via the native Web Share API where available
 * (mobile browsers, most desktop browsers as of 2026), falling back to
 * copying the URL to the clipboard. Returns `copied` so callers can show
 * a brief "¡Copiado!" confirmation on the fallback path.
 */
export function useShare(title: string, text?: string) {
    const [copied, setCopied] = useState(false);

    const share = async () => {
        const url = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({ title, text, url });
            } catch {
                // User cancelled the native share sheet — not an error.
            }
            return;
        }

        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return { share, copied };
}
