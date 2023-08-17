//--------------------------------------------------------------------------
// Tailwind Typography configuration
//--------------------------------------------------------------------------
//
// Here you may overwrite the default Tailwind Typography (or prosé) styles or configure certain variants.
// More info: https://tailwindcss.com/docs/typography-plugin.
//

const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`

module.exports = {
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.black.DEFAULT'),
            '--tw-prose-headings': theme('colors.black.DEFAULT'),
            '--tw-prose-lead': theme('colors.black.DEFAULT'),
            '--tw-prose-links': theme('colors.black.DEFAULT'),
            '--tw-prose-bold': theme('colors.black.DEFAULT'),
            '--tw-prose-counters': theme('colors.black.DEFAULT'),
            '--tw-prose-bullets': theme('colors.black.DEFAULT'),
            '--tw-prose-hr': theme('colors.charcoal.DEFAULT'),
            '--tw-prose-quotes': theme('colors.black.DEFAULT'),
            '--tw-prose-quote-borders': theme('colors.charcoal.40 / 1'),
            '--tw-prose-captions': theme('colors.black.DEFAULT'),
            '--tw-prose-code': theme('colors.black.DEFAULT'),
            '--tw-prose-pre-code': theme('colors.white'),
            '--tw-prose-pre-bg': theme('colors.black.DEFAULT'),
            '--tw-prose-th-borders': theme('colors.black.DEFAULT'),
            '--tw-prose-td-borders': theme('colors.black.DEFAULT'),
            '--tw-prose-invert-body': theme('colors.white'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.white'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.white'),
            '--tw-prose-invert-bullets': theme('colors.white'),
            '--tw-prose-invert-hr': theme('colors.white'),
            '--tw-prose-invert-quotes': theme('colors.white'),
            '--tw-prose-invert-quote-borders': theme('colors.white'),
            '--tw-prose-invert-captions': theme('colors.white'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.neutral.DEFAULT'),
            '--tw-prose-invert-pre-bg': theme('colors.white'),
            '--tw-prose-invert-th-borders': theme('colors.white'),
            '--tw-prose-invert-td-borders': theme('colors.white'),
            lineHeight: round(24 / 16),
            'ul > li > p, ol > li > p': {
              marginTop: '0em !important',
              marginBottom: '0em !important',
            },
            ':where(.prose > div > :first-child)': {
              marginTop: '0 !important',
            },
            ':where(.prose > div > :last-child)': {
              marginBottom: '0 !important',
            },
            '.not-prose': {
              margin: '2rem 0 !important',
            },
            'p strong': {
              fontWeight: '500',
            },
            'strong': {
              fontWeight: '500',
            },
            '[class~="lead"]': {
              fontSize: em(35, 16),
              lineHeight: round(42 / 35),
              marginTop: em(48, 35),
              marginBottom: em(24, 35),
            },
            a: {
              fontWeight: '300',
            },
            h1: {
              fontWeight: '300',
              color: 'var(--tw-prose-headings)',
            },
            'h1 strong': {
              fontWeight: '500',
              color: 'inherit',
            },
            h2: {
              fontWeight: '300',
              color: 'var(--tw-prose-headings)',
            },
            'h2 strong': {
              fontWeight: '500',
              color: 'inherit',
            },
            'h2': {
              fontSize: em(35, 16),
              lineHeight: round(42 / 35),
              marginTop: em(48, 35),
              marginBottom: em(24, 35),
              fontWeight: '300',
            },
            h3: {
              fontWeight: '500',
              color: 'var(--tw-prose-headings)',
              fontSize: em(18, 16),
              marginTop: em(32, 18),
              marginBottom: em(12, 18),
              lineHeight: round(25.2 / 18),
            },
            'h3 strong': {
              fontWeight: '500',
              color: 'inherit',
            },
            h4: {
              fontWeight: '500',
              color: 'var(--tw-prose-headings)',
              fontSize: em(18, 16),
              lineHeight: round(28 / 18),
              marginTop: em(24, 18),
              marginBottom: em(8, 18),
            },
            'h4 strong': {
              fontWeight: '500',
              color: 'inherit',
            },
            blockquote: {
              fontWeight: '300',
              fontStyle: 'normal'
            },
          }
        },
        lg: {
          css: {
            lineHeight: round(25 / 18),

            '[class~="lead"]': {
              fontSize: em(45, 18),
              marginTop: em(32, 45),
              marginBottom: em(32, 45),
              lineHeight: round(49.5 / 45),
            },
            h2: {
              fontSize: em(45, 18),
              marginTop: em(56, 45),
              marginBottom: em(32, 45),
              lineHeight: round(49.5 / 45),
            },
            h3: {
              fontSize: em(35, 18),
              marginTop: em(40, 35),
              marginBottom: em(16, 35),
              lineHeight: round(42 / 35),
              fontWeight: '300',
            },
            h4: {
              fontSize: em(24, 18),
              lineHeight: round(32 / 24),
              marginTop: em(32, 18),
              marginBottom: em(8, 18),
            },
          }
        },
      }),
    }
  },
  plugins: [
    require('@tailwindcss/typography')({
      modifiers: [],
    }),
  ]
}
