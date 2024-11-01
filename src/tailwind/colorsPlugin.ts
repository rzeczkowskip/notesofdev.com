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
    ({ addBase, theme }) => {
      const light: Record<string, string> = {};
      const dark: Record<string, string> = {};
      const global: Record<string, string> = {};

      Object.entries(options.palettes).forEach(([colorName, config]) => {
        Object.values(config.light || {}).forEach((color, i) => {
          light[`--color-${colorName}-${i + 1}`] = color;
        });

        Object.values(config.dark || {}).forEach((color, i) => {
          dark[`--color-${colorName}-${i + 1}`] = color;
        });

        ['surface', 'contrast', 'indicator', 'track'].forEach((colorType) => {
          const colorValue = config?.[
            colorType as keyof ColorConfig
          ] as AdditionalColor;

          if (!colorValue) {
            return;
          }

          global[`--color-${colorType}`] = resolveAdditionalColor(
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
    },
  (options: ColorsPluginOptions) => {
    const colors = Object.fromEntries(
      Object.entries(options.palettes).map(([colorName, config]) => {
        const keys = Math.max(
          Object.keys(config?.light || {})?.length || 0,
          Object.keys(config?.dark || {})?.length || 0,
        );

        return [
          colorName,
          Object.fromEntries(
            new Array(keys)
              .fill('')
              .map((_, i) => [i + 1, `var(--color-${colorName}-${i + 1})`]),
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

export default colorsPlugin;
