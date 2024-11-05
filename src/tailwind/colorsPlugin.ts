/* eslint-disable import/no-extraneous-dependencies */

import plugin from 'tailwindcss/plugin';
import { PluginAPI, ThemeConfig } from 'tailwindcss/types/config';

type GetValueFromTheme = (theme: PluginAPI['theme']) => string;

type Scale = Record<string, string>;
type AdditionalColor = string | GetValueFromTheme;

type LightAndDark<T> = {
  light?: T;
  dark?: T;
};

type ColorConfig = LightAndDark<Scale> & {
  surface?: AdditionalColor;
  contrast?: AdditionalColor;
  indicator?: AdditionalColor;
  track?: AdditionalColor;
};

type TailwindColors = Record<string, ColorConfig>;

export type ColorsPluginOptions = {
  palettes: TailwindColors;
  background?: LightAndDark<AdditionalColor>;
  colors?: ThemeConfig['colors'];
};

const resolveAdditionalColor = (
  additionalColor: AdditionalColor,
  theme: PluginAPI['theme'],
) =>
  typeof additionalColor === 'string'
    ? additionalColor
    : additionalColor(theme);

const colorsPlugin = plugin.withOptions(
  (options: ColorsPluginOptions) =>
    ({ addBase, addUtilities, theme }) => {
      const light: Record<string, string> = {};
      const dark: Record<string, string> = {};
      const global: Record<string, string> = {};

      Object.entries(options.palettes).forEach(([colorName, config]) => {
        Object.entries(config.light || {}).forEach(([shade, color]) => {
          light[`--color-${colorName}-${shade}`] = color;
        });

        Object.entries(config.dark || {}).forEach(([shade, color]) => {
          dark[`--color-${colorName}-${shade}`] = color;
        });

        ['surface', 'contrast', 'indicator', 'track'].forEach((colorType) => {
          const colorValue = config?.[
            colorType as keyof ColorConfig
          ] as AdditionalColor;

          if (!colorValue) {
            return;
          }

          global[`--color-${colorName}-${colorType}`] = resolveAdditionalColor(
            colorValue,
            theme,
          );
        });
      });

      if (options?.background?.light) {
        light['--color-background'] = resolveAdditionalColor(
          options.background.light,
          theme,
        );
      }

      if (options?.background?.dark) {
        dark['--color-background'] = resolveAdditionalColor(
          options.background.dark,
          theme,
        );
      }

      addBase({
        ':root': global,
        ':root, .light, .dark .invert': light,
        '.dark, .light .invert': dark,
        body: {
          backgroundColor: 'var(--color-background)',
        },
      });

      addUtilities({
        '.bg-solid': {
          backgroundColor: 'var(--color-background)',
        },
      });
    },
  (options: ColorsPluginOptions) => {
    const colors = Object.fromEntries(
      Object.entries(options.palettes).map(([colorName, config]) => {
        const shades = [
          ...new Set(
            [
              ...Object.keys(config?.light || {}),
              ...Object.keys(config?.dark || {}),
              Object.keys(config).filter(
                (key) => !['light', 'dark'].includes(key),
              ),
            ].flat(),
          ),
        ];

        return [
          colorName,
          Object.fromEntries(
            shades.map((shade) => [
              shade,
              `var(--color-${colorName}-${shade})`,
            ]),
          ),
        ];
      }),
    );

    return {
      theme: {
        extend: {
          colors: {
            ...colors,
            transparent: 'transparent',
            current: 'currentColor',
            ...(options.colors || {}),
          },
        },
      },
    };
  },
);

export const radixToScale = (colors: Scale): Scale => {
  return Object.fromEntries(
    Object.values(colors).map((value, i) => [i + 1, value]),
  );
};

export default colorsPlugin;
