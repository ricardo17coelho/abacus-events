import { useTheme } from 'vuetify';
import { themes } from '@/plugins/vuetify';

export default function useBrand() {
  const theme = useTheme();

  // Define the current theme variant (dark or light)
  const currentThemeVariant: 'dark' | 'light' = theme.current.value.dark
    ? 'dark'
    : 'light';

  const resetColorPrimary = () => {
    if (
      !currentThemeVariant ||
      !theme.themes.value[currentThemeVariant]?.colors?.primary ||
      !themes[currentThemeVariant]?.colors?.primary ||
      !themes?.[currentThemeVariant] ||
      Object.keys(themes).length === 0
    )
      return;

    theme.themes.value[currentThemeVariant].colors.primary =
      themes[currentThemeVariant]?.colors.primary;
  };

  const resetColorSecondary = () => {
    if (!themes[currentThemeVariant]?.colors?.secondary) return;

    theme.themes.value[currentThemeVariant].colors.secondary =
      themes[currentThemeVariant]?.colors?.secondary;
  };

  const setBrand = (
    primary?: string,
    secondary?: string,
    tertiary?: string,
  ) => {
    if (primary) {
      theme.themes.value[currentThemeVariant].colors.primary = primary;
    } else {
      resetColorPrimary();
    }

    if (secondary) {
      theme.themes.value[currentThemeVariant].colors.secondary = secondary;
    }

    if (tertiary) {
      theme.themes.value[currentThemeVariant].colors.tertiary = tertiary;
    }
  };

  const clearBrand = () => {
    resetColorPrimary();
    resetColorSecondary();
  };

  return {
    setBrand,
    clearBrand,
  };
}
