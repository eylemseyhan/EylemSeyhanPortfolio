/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx,html}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Lexend', 'ui-sans-serif', 'system-ui'],
                mono: ['Fira Code', 'monospace'],
                sans: ['Sora', 'Lexend', 'Arial', 'sans-serif'],
            },
            colors: {
                primary: '#c026d3',
                'primary-op': 'hsl(287, 60%, 65%, 0.1)',
                accent: '#a21caf',
                'accent-light': '#06b6d4',
                gray: 'hsl(219, 14%, 71%)',
                'gray-op': 'hsl(219, 14%, 71%, 0.1)',
                background: '#18181b',
                white: '#fff',
                'dark-lighter': '#232336',
            },
            screens: {
                desktop: '1024px',
                tablet: '768px',
                mobile: '500px',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'bounce-slow': 'bounce 2s infinite',
                'blob': 'blob 7s infinite',
                'spin-slow': 'spin 4s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                blob: {
                    '0%, 100%': { transform: 'translateY(0px) scale(1)' },
                    '33%': { transform: 'translateY(-20px) scale(1.1)' },
                    '66%': { transform: 'translateY(10px) scale(0.9)' },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/aspect-ratio')],
}