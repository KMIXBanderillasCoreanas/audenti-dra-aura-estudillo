/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // AUDENTI Brand System
        'brand-navy':    '#202D4C',
        'brand-gold':    '#E3A033',
        'brand-cream':   '#fdf9f1',
        // Surface system (matching Stitch design)
        surface: {
          DEFAULT:           '#fdf9f1',
          bright:            '#fdf9f1',
          dim:               '#dddad2',
          container: {
            DEFAULT:         '#f1ede6',
            low:             '#f7f3eb',
            high:            '#ece8e0',
            highest:         '#e6e2da',
            lowest:          '#ffffff',
          },
        },
        primary: {
          DEFAULT:           '#825500',
          container:         '#E3A033',
          'fixed':           '#ffddb2',
          'fixed-dim':       '#ffb94e',
        },
        secondary: {
          DEFAULT:           '#555f6f',
          container:         '#d6e0f3',
          fixed:             '#d9e3f6',
          'fixed-dim':       '#bdc7da',
        },
        tertiary: {
          DEFAULT:           '#506071',
          container:         '#9eafc2',
          fixed:             '#d3e4f8',
          'fixed-dim':       '#b7c8dc',
        },
        'on-primary':            '#ffffff',
        'on-primary-container':  '#5a3a00',
        'on-secondary':          '#ffffff',
        'on-secondary-fixed':    '#121c2a',
        'on-surface':            '#1c1c17',
        'on-surface-variant':    '#514535',
        'on-background':         '#1c1c17',
        outline: {
          DEFAULT:               '#837563',
          variant:               '#d5c4af',
        },
        error: {
          DEFAULT:               '#ba1a1a',
          container:             '#ffdad6',
        },
        'inverse-primary':       '#ffb94e',
        'inverse-surface':       '#31302b',
        'inverse-on-surface':    '#f4f0e8',
      },
      fontFamily: {
        headline: ['Outfit', 'sans-serif'],
        body:     ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
