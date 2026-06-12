// ─────────────────────────────────────────────────────────────
//  Dual design system — "The Genome Explorer".
//  Dark = bioluminescent void. Light = clean lab whites.
//  Both share the aqua → indigo brand identity.
// ─────────────────────────────────────────────────────────────

const shared = {
  borderRadius: '16px',
  font: "'Inter', system-ui, sans-serif",
  fontDisplay: "'Space Grotesk', 'Inter', sans-serif",
  fontMono: "'JetBrains Mono', 'Fira Code', monospace",
};

export const darkTheme = {
  ...shared,
  mode: 'dark',

  // Surfaces
  background: '#05060b',
  lightNavy: '#0c0e16',
  navy: '#10131d',
  lightestNavy: '#1a1f2e',
  cardBackground: '#0c0e16',
  navBackground: 'rgba(5, 6, 11, 0.65)',
  border: 'rgba(255, 255, 255, 0.08)',
  borderStrong: 'rgba(255, 255, 255, 0.14)',

  // Accents
  highlight: '#34e3c8',
  accent2: '#7c83ff',
  accent3: '#ff5ea8',
  highlightTint: 'rgba(52, 227, 200, 0.1)',
  accent2Tint: 'rgba(124, 131, 255, 0.12)',
  accentRed: '#ff5ea8',

  // Gradients
  gradient: 'linear-gradient(120deg, #34e3c8 0%, #7c83ff 100%)',
  gradientSoft: 'linear-gradient(120deg, rgba(52,227,200,0.16), rgba(124,131,255,0.16))',
  gradFrom: '#34e3c8',
  gradTo: '#7c83ff',

  // Text
  textWhite: '#ffffff',
  textLightSlate: '#e7ecf6',
  textSlate: '#97a1b8',
  textMuted: '#5c6479',

  // FX
  vignette: 'rgba(0, 0, 0, 0.55)',
};

export const lightTheme = {
  ...shared,
  mode: 'light',

  // Surfaces
  background: '#f6f8fc',
  lightNavy: '#ffffff',
  navy: '#eef1f8',
  lightestNavy: '#e2e7f1',
  cardBackground: '#ffffff',
  navBackground: 'rgba(246, 248, 252, 0.72)',
  border: 'rgba(12, 18, 36, 0.10)',
  borderStrong: 'rgba(12, 18, 36, 0.18)',

  // Accents (darker for contrast on light surfaces)
  highlight: '#0c9f88',
  accent2: '#5159e0',
  accent3: '#e0428a',
  highlightTint: 'rgba(12, 159, 136, 0.10)',
  accent2Tint: 'rgba(81, 89, 224, 0.10)',
  accentRed: '#e0428a',

  // Gradients
  gradient: 'linear-gradient(120deg, #0e9e88 0%, #5159e0 100%)',
  gradientSoft: 'linear-gradient(120deg, rgba(14,158,136,0.12), rgba(81,89,224,0.12))',
  gradFrom: '#0e9e88',
  gradTo: '#5159e0',

  // Text
  textWhite: '#0a0e1a',
  textLightSlate: '#141a2c',
  textSlate: '#4d5973',
  textMuted: '#8a93a8',

  // FX
  vignette: 'transparent',
};

export const getTheme = (mode) => (mode === 'light' ? lightTheme : darkTheme);

// Default/legacy export.
export const theme = darkTheme;
export default darkTheme;
