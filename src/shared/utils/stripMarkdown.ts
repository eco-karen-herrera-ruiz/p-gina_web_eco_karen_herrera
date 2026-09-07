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
        // Strip emoji so the TTS engine doesn't narrate them by name
        // (e.g. "👋" being read aloud as "mano saludando"). Target is es5,
        // so no \u{...}/u-flag syntax — match astral chars as surrogate
        // pairs, plus the common BMP symbol/dingbat blocks and modifiers.
        .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '')
        .replace(new RegExp('[\\u2600-\\u27BF\\u2300-\\u23FF\\u2B00-\\u2BFF\\u2190-\\u21FF\\uFE0F\\u200D\\u20E3]', 'g'), '')
        // Clean up multiple newlines
        .replace(/\n+/g, ' ')
        // Remove extra spaces
        .replace(/\s+/g, ' ')
        .trim();
}
