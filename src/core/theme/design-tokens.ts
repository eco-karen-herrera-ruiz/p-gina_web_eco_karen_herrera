export const designTokens = {
    colors: {
        brand: {
            navy: '#0F1E2D',
            navyLight: '#1A3447',
            gold: '#C8963E',
            goldLight: '#E8D5B0',
            white: '#FFFFFF',
            offWhite: '#F8F9FA',
            neutral: '#4A5568',
            neutralLight: '#7B8A9B',
        },
        background: {
            section: '#F8F9FA',
            card: '#FFFFFF',
            default: '#F8F9FA',
        },
        text: {
            primary: '#0F1E2D',
            muted: '#4A5568',
            light: '#7B8A9B',
            white: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: {
            heading: 'var(--font-playfair)',
            body: 'var(--font-dm-sans)',
            mono: 'var(--font-dm-mono)',
        },
    },
    spacing: {
        section: '5rem',
        container: '2rem',
    },
    borderRadius: {
        card: '1.25rem',
        button: '0.75rem',
    },
} as const;
