export interface Palette {
  primary: string;
  primaryDark: string;
  primaryText: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  border: string;
  danger: string;
  success: string;
  star: string;
  skeletonBg: string;
  skeletonHighlight: string;
  overlay: string;
  white: string;
}

export const lightPalette: Palette = {
  primary: '#5B2EBF',
  primaryDark: '#3F1D8F',
  primaryText: '#FFFFFF',
  background: '#F4F2FA',
  surface: '#FFFFFF',
  surfaceAlt: '#EEE9FA',
  text: '#16131F',
  textMuted: '#6B6780',
  border: '#E1DCF0',
  danger: '#E5484D',
  success: '#2FA84F',
  star: '#F5B301',
  skeletonBg: '#E4E0F0',
  skeletonHighlight: '#F4F2FA',
  overlay: 'rgba(22,19,31,0.55)',
  white: '#FFFFFF',
};

export const darkPalette: Palette = {
  primary: '#8B63F0',
  primaryDark: '#6B45D1',
  primaryText: '#FFFFFF',
  background: '#0E0C16',
  surface: '#1A1726',
  surfaceAlt: '#262237',
  text: '#F3F1FA',
  textMuted: '#A29EB8',
  border: '#2F2A45',
  danger: '#FF6B70',
  success: '#4CC46C',
  star: '#F5B301',
  skeletonBg: '#2A2640',
  skeletonHighlight: '#3A3558',
  overlay: 'rgba(0,0,0,0.65)',
  white: '#FFFFFF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
  xxl: 28,
};
