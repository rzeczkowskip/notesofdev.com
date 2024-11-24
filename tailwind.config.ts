/* eslint-disable import/no-extraneous-dependencies */

import {
  blue,
  blueDark,
  grass,
  grassDark,
  gray,
  grayDark,
  red,
  redDark,
  yellow,
  yellowDark,
} from '@radix-ui/colors';
import tailwindTypography from '@tailwindcss/typography';
import { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import { CustomThemeConfig } from 'tailwindcss/types/config';
import colorsPlugin, { radixToScale } from './src/tailwind/colorsPlugin';

const config: Config = {
  darkMode: 'class',
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      serif: ['var(--font-serif)', ...defaultTheme.fontFamily.serif],
    },
    screens: Object.fromEntries(
      Object.entries(defaultTheme.screens).filter(
        ([screen]) => !['2xl'].includes(screen),
      ),
    ),
    extend: {
      borderColor: ({ theme }) => ({
        DEFAULT: theme('colors.gray.6'),
      }),
      typography: (
        theme: <K extends string>(key: K) => CustomThemeConfig[K],
      ) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'currentColor',
            '--tw-prose-headings': 'currentColor',
            '--tw-prose-lead': theme('colors.primary.12'),
            '--tw-prose-links': theme('colors.primary.11'),
            '--tw-prose-bold': 'currentColor',
            '--tw-prose-counters': theme('colors.primary.12'),
            '--tw-prose-bullets': theme('colors.primary.12'),
            '--tw-prose-hr': theme('colors.gray.8'),
            '--tw-prose-quotes': 'currentColor',
            '--tw-prose-quote-borders': theme('colors.primary.8'),
            '--tw-prose-captions': theme('colors.gray.11'),
            '--tw-prose-code': theme('colors.gray.12'),
            '--tw-prose-code-bg': theme('colors.gray.3'),
            '--tw-prose-pre-code': '',
            '--tw-prose-pre-bg': '',
            '--tw-prose-th-borders': theme('colors.gray.8'),
            '--tw-prose-td-borders': theme('colors.gray.6'),
            '--tw-prose-invert-body': 'currentColor',
            '--tw-prose-invert-headings': 'currentColor',
            '--tw-prose-invert-lead': 'currentColor',
            '--tw-prose-invert-links': 'currentColor',
            '--tw-prose-invert-bold': 'currentColor',
            '--tw-prose-invert-counters': 'currentColor',
            '--tw-prose-invert-bullets': 'currentColor',
            '--tw-prose-invert-hr': 'currentColor',
            '--tw-prose-invert-quotes': 'currentColor',
            '--tw-prose-invert-quote-borders': 'currentColor',
            '--tw-prose-invert-captions': 'currentColor',
            '--tw-prose-invert-code': 'currentColor',
            '--tw-prose-invert-pre-code': 'currentColor',
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': 'currentColor',
            '--tw-prose-invert-td-borders': 'currentColor',
            maxWidth: 'none',
            fontFamily: theme('fontFamily.serif').join(','),
            'h1,h2,h3,h4,h5,h6': {
              fontWeight: theme('fontWeight.semibold'),
              fontFamily: theme('fontFamily.sans').join(','),
              marginBottom: '1rem',
              '&:not(:first-child)': {
                marginTop: '1.5em',
              },
            },
            code: {
              backgroundColor: 'var(--tw-prose-code-bg)',
              padding: '0 .1em',
            },
          },
        },
      }),
    },
  },
  content: [
    './src/app/**/*.{ts,jsx,tsx,mdx}',
    './src/components/**/*.{ts,tsx,mdx}',
  ],
  plugins: [
    tailwindTypography(),
    colorsPlugin({
      palettes: {
        primary: {
          light: radixToScale(blue),
          dark: radixToScale(blueDark),
          surface: 'color(display-p3 0.9529 0.9765 1 / 0.8)',
          contrast: '#fff',
          indicator: 'oklch(64.9% 0.193 251.8)',
          track: 'oklch(64.9% 0.193 251.8)',
        },
        gray: { light: radixToScale(gray), dark: radixToScale(grayDark) },
        danger: { light: radixToScale(red), dark: radixToScale(redDark) },
        success: { light: radixToScale(grass), dark: radixToScale(grassDark) },
        info: { light: radixToScale(blue), dark: radixToScale(blueDark) },
        warning: {
          light: radixToScale(yellow),
          dark: radixToScale(yellowDark),
        },
      },
      background: {
        light: '#fff',
        dark: '#111',
      },
    }),
    plugin(({ addBase, addUtilities, theme }) => {
      addBase({
        body: { color: theme('colors.gray.12') },
      });

      addUtilities({
        '.prose-container': {
          maxWidth: '44rem',
        },
      });
    }),
  ],
};

export default config;
