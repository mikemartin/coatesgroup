//--------------------------------------------------------------------------
// Tailwind site configuration
//--------------------------------------------------------------------------
//
// Use this file to completely define the current sites design system by
// adding and extending to Tailwinds default utility classes.
//

const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
  presets: [],
  darkMode: 'class',
  theme: {
    // Here we define the default colors available. If you want to include
    // all default Tailwind colors you should extend the colors instead.
    colors: {
      white:  '#fff',
      // Neutrals: neutral colors, with a default fallback if you don't need shades. Always set a DEFAULT when you use shades.
      neutral: {
        DEFAULT: colors.slate['800'],
        ...colors.slate
      },
      // Primary: primary brand color with a default fallback if you don't need shades. Always set a DEFAULT when you use shades.
      primary: {
        DEFAULT: 'rgb(var(--color-blue) / <alpha-value>)',
        '40': 'rgb(var(--color-blue) / 40%)',
        '20': 'rgb(var(--color-blue) / 20%)',
      },
      blue: {
        DEFAULT: 'rgb(var(--color-blue) / <alpha-value>)',
        '40': 'rgb(var(--color-blue) / 40%)',
        '20': 'rgb(var(--color-blue) / 20%)',
      },
      red: {
        DEFAULT: 'rgb(var(--color-red) / <alpha-value>)',
        '40': 'rgb(var(--color-red) / 40%)',
        '20': 'rgb(var(--color-red) / 20%)',
      },
      yellow: {
        DEFAULT: 'rgb(var(--color-yellow) / <alpha-value>)',
        '40': 'rgb(var(--color-yellow) / 40%)',
        '20': 'rgb(var(--color-yellow) / 20%)',
      },
      green: {
        DEFAULT: 'rgb(var(--color-green) / <alpha-value>)',
        '40': 'rgb(var(--color-green) / 40%)',
        '20': 'rgb(var(--color-green) / 20%)',
      },
      black: {
        DEFAULT: 'rgb(var(--color-black) / <alpha-value>)',
        '90': 'rgb(var(--color-black) / 90%)',
        '80': 'rgb(var(--color-black) / 80%)',
        '70': 'rgb(var(--color-black) / 70%)',
        '60': 'rgb(var(--color-black) / 60%)',
        '50': 'rgb(var(--color-black) / 50%)',
        '40': 'rgb(var(--color-black) / 40%)',
        '30': 'rgb(var(--color-black) / 30%)',
        '20': 'rgb(var(--color-black) / 20%)',
        '10': 'rgb(var(--color-black) / 10%)',
      },
      charcoal: {
        DEFAULT: 'rgb(var(--color-charcoal) / <alpha-value>)',
        '60': 'rgb(var(--color-charcoal-60) / <alpha-value>)',
        '40': 'rgb(var(--color-charcoal-40) / <alpha-value>)',
        '20': 'rgb(var(--color-charcoal-20) / <alpha-value>)',
        '10': 'rgb(var(--color-charcoal-10)/ <alpha-value>)',
      },
    },
    extend: {
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
      },
      animation: {
        bob: 'bob 1s infinite',
      },
      boxShadow: {
        'black-hover': 'inset 0 -3.25em 0 rgb(var(--color-black))',
        'charcoal-hover': 'inset 0 -3.25em 0 rgb(var(--color-charcoal))',
        'white-hover': 'inset 0 -3.25em 0 rgb(255,255,255)',
        'blue-hover': 'inset 0 -3.25em 0 rgb(var(--color-blue))',
      },
      keyframes: {
        bob: {
          '0%, 100%': {
            transform: 'translateX(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
      // Set default transition durations and easing when using the transition utilities.
      transitionDuration: {
        DEFAULT: '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      lineHeight: {
        'tighter': "1.1"
      },
      spacing: {
        '4.5': '1.125rem'
      },
      fontSize: {
        lg: ['1.125rem', { lineHeight: '1.575rem' }],
        '2xl': ['1.5625rem;', { lineHeight: '2.03125rem' }],
        '4xl': ['2.1875rem', { lineHeight: '2.625rem' }],
        '5xl': ['2.8125rem', { lineHeight: '3.09375rem' }],
        '7xl': ['4.5rem', { lineHeight: '4.95rem' }]
      },
    },
    // Remove the font families you don't want to use.
    fontFamily: {
      mono: [
        // Use a custom mono font for this site by changing 'Anonymous' to the
        // font name you want and uncommenting the following line.
        'Roboto Mono',
        ...defaultTheme.fontFamily.mono,
      ],
      sans: [
        // Use a custom sans serif font for this site by changing 'Gaultier' to the
        // font name you want and uncommenting the following line.
        'Roboto',
        ...defaultTheme.fontFamily.sans,
      ],
      serif: [
        // Use a custom serif font for this site by changing 'Lavigne' to the
        // font name you want and uncommenting the following line.
        // 'Lavigne',
        ...defaultTheme.fontFamily.serif,
      ],
    },

    // The font weights available for this site.
    fontWeight: {
      // hairline: 100,
      // thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      // semibold: 600,
      bold: 700,
      // extrabold: 800,
      // black: 900,
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        // Default color transition on links unless user prefers reduced motion.
        '@media (prefers-reduced-motion: no-preference)': {
          'a': {
            transition: 'color .3s ease-in-out',
          },
        },
        'html': {
            color: theme('colors.neutral.DEFAULT'),
            //--------------------------------------------------------------------------
            // Set sans, serif or mono stack with optional custom font as default.
            //--------------------------------------------------------------------------
            // fontFamily: theme('fontFamily.mono'),
            fontFamily: theme('fontFamily.sans'),
            // fontFamily: theme('fontFamily.serif'),
        },
        'mark': {
          backgroundColor: theme('colors.primary.DEFAULT'),
          color: theme('colors.white')
        },
      })
    }),

    // Custom components for this particular site.
    plugin(function({ addComponents, theme }) {
      const components = {
        '.w-medium::after': {
          content: ['attr(data-text)', 'attr(data-text) / ""'],
          height: 0,
          visibility: 'hidden',
          overflow: 'hidden',
          userSelect: 'none',
          pointerEvents: 'none',
          fontWeight: theme('fontWeight.medium'),

          '@media speech': {
            display: 'none',
          },
        },
      }
      addComponents(components)
    }),

    // Custom utilities for this particular site.
    plugin(function({ addUtilities, theme, variants }) {
      const newUtilities = {
      }
      addUtilities(newUtilities)
    }),
  ]
}
