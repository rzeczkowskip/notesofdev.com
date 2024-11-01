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
import colorsPlugin from './src/tailwind/colorsPlugin';

const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            'h1,h2,h3,h4,h5,h6': {
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
          light: blue,
          dark: blueDark,
          surface: 'color(display-p3 0.9529 0.9765 1 / 0.8)',
          contrast: '#fff',
          indicator: 'oklch(64.9% 0.193 251.8)',
          track: 'oklch(64.9% 0.193 251.8)',
        },
        gray: { light: gray, dark: grayDark },
        danger: { light: red, dark: redDark },
        success: { light: grass, dark: grassDark },
        info: { light: blue, dark: blueDark },
        warning: { light: yellow, dark: yellowDark },
      },
      background: {
        light: '#fff',
        dark: '#111',
      },
    }),
  ],
};

export default config;
