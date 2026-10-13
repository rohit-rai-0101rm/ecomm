import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useAppSelector } from '../store/hooks';
import { darkPalette, lightPalette, Palette } from './tokens';

interface ThemeContextValue {
  colors: Palette;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  colors: lightPalette,
  isDark: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector(state => state.theme.mode);
  const system = useColorScheme();

  const value = useMemo<ThemeContextValue>(() => {
    const isDark = mode === 'system' ? system === 'dark' : mode === 'dark';
    return { isDark, colors: isDark ? darkPalette : lightPalette };
  }, [mode, system]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
