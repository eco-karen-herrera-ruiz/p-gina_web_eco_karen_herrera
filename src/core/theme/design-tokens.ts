export const designTokens = {
    colors: {
        primary: {
            DEFAULT: '#FBCFE8', // Soft Pink Pastel
            dark: '#EC4899',
            light: '#FDF2F8'
        },
        secondary: {
            DEFAULT: '#BAE6FD', // Sky Blue Pastel
            dark: '#0EA5E9',
            light: '#F0F9FF'
        },
        background: {
            section: '#FDF2F8', // Soft pink tint background
            card: '#FFFFFF',
            default: '#FAFAFA' // Bone/Off-white
        },
        text: {
            primary: '#1E293B', // Slate 800 (Professional navy/slate)
            muted: '#64748B', // Slate 500
            white: '#FFFFFF'
        }
    },
    typography: {
        fontFamily: {
            heading: 'var(--font-playfair)',
            body: 'var(--font-dm-sans)',
            mono: 'var(--font-dm-mono)'
        }
    },
    spacing: {
        section: '5rem',
        container: '2rem',
    },
    borderRadius: {
        card: '1.25rem', // rounded-2xl feel
        button: '0.75rem', // rounded-xl feel
    }
};
