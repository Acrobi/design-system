import { parseToHsl, hslToHex } from 'color2k';

// Defines the saturation and lightness ramp for our 11-step palette.
const ramp = [
  { s: 0.16, l: 0.97 }, // 50
  { s: 0.20, l: 0.94 }, // 100
  { s: 0.25, l: 0.89 }, // 200
  { s: 0.35, l: 0.83 }, // 300
  { s: 0.50, l: 0.75 }, // 400
  { s: 0.70, l: 0.65 }, // 500
  { s: 0.75, l: 0.55 }, // 600
  { s: 0.80, l: 0.45 }, // 700
  { s: 0.85, l: 0.35 }, // 800
  { s: 0.90, l: 0.25 }, // 900
  { s: 0.95, l: 0.15 }, // 950
];

export function generatePalette(baseColor: string): Record<string, string> {
  const { h } = parseToHsl(baseColor);
  const palette: Record<string, string> = {};
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  ramp.forEach((step, index) => {
    const key = `p${steps[index]}`;
    const newColor = hslToHex(`hsl(${h}, ${step.s * 100}%, ${step.l * 100}%)`);
    palette[key] = newColor;
  });

  return palette;
}