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

export { stripMarkdown } from './stripMarkdown';
