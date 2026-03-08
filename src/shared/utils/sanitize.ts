import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizes an HTML string to prevent XSS attacks.
 * Uses isomorphic-dompurify to work correctly in both server and client environments.
 * @param html The potentially unsafe HTML string
 * @returns A safe, sanitized HTML string
 */
export function sanitize(html: string): string {
    if (!html) return '';
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'span'],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    });
}

/**
 * Strips markdown symbols from a string to prepare it for speech synthesis.
 * Removes bold, italic, headers, links, and code blocks.
 * @param markdown The raw markdown string
 * @returns A plain text string suitable for TTS
 */
export function stripMarkdown(markdown: string): string {
    if (!markdown) return '';
    
    return markdown
        // Remove code blocks (```) first to avoid processing their content
        .replace(/```[\s\S]*?```/g, '')
        // Remove bold/italic symbols (**, __, *, _) carefully
        .replace(/(\*\*|__)(.*?)\1/g, '$2')
        .replace(/(\*|_)(.*?)\1/g, '$2')
        // Remove any remaining loose asterisks or underscores
        .replace(/\*/g, '')
        .replace(/_/g, '')
        // Remove headers (#)
        .replace(/^#+\s+(.*)$/gm, '$1')
        // Remove links [text](url) -> text
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        // Remove single backticks (`)
        .replace(/`/g, '')
        // Remove blockquotes (>)
        .replace(/^>\s+/gm, '')
        // Remove horizontal rules (---)
        .replace(/^---$/gm, '')
        // Clean up multiple newlines
        .replace(/\n+/g, ' ')
        // Remove extra spaces
        .replace(/\s+/g, ' ')
        .trim();
}
