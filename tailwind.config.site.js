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
        '60': 'rgb(var(--color-black) / 60%)',
        '40': 'rgb(var(--color-black) / 40%)',
        '20': 'rgb(var(--color-black) / 20%)',
        '10': 'rgb(var(--color-black) / 10%)',
      },
    },
    extend: {
      // Set default transition durations and easing when using the transition utilities.
      transitionDuration: {
        DEFAULT: '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
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
