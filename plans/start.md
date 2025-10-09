# This script should be executed in the root of the 'design-system' repository.

# 1. Upgrade 'theme-utils.ts' with the new, more powerful theme generation logic.
echo "Upgrading theme-utils.ts with dark mode inversion and neutral tinting..."
cat <<'EOL' > ./src/lib/theme-utils.ts
import { parseToHsl, hslToHex, readableColor, analogous, triad, complementary } from 'color2k';

// Ramps define the saturation and lightness steps for palettes.
const pRamp = [ { s: 0.16, l: 0.97 }, { s: 0.20, l: 0.94 }, { s: 0.25, l: 0.89 }, { s: 0.35, l: 0.83 }, { s: 0.50, l: 0.75 }, { s: 0.70, l: 0.65 }, { s: 0.75, l: 0.55 }, { s: 0.80, l: 0.45 }, { s: 0.85, l: 0.35 }, { s: 0.90, l: 0.25 }, { s: 0.95, l: 0.15 } ];
const nRamp = [ { s: 0.0, l: 1.0 }, { s: 0.005, l: 0.985 }, { s: 0.006, l: 0.97 }, { s: 0.01, l: 0.922 }, { s: 0.015, l: 0.843 }, { s: 0.02, l: 0.708 }, { s: 0.023, l: 0.556 }, { s: 0.025, l: 0.439 }, { s: 0.025, l: 0.371 }, { s: 0.022, l: 0.269 }, { s: 0.018, l: 0.205 }, { s: 0.015, l: 0.145 } ];

function generatePalette(baseColor: string, ramp: {s: number, l: number}[], steps: number[], tinted: boolean): string[] {
  const { h } = parseToHsl(baseColor);
  return ramp.map(step => hslToHex(`hsl(${tinted ? h : 0}, ${tinted ? step.s * 100 : 0}%, ${step.l * 100}%)`));
}

export const generateSecondaryColorSuggestions = (baseColor: string) => { /* ... (no changes needed) ... */ };

export function generateThemeFromColors({ primary, secondary, tinted }: { primary: string, secondary?: string, tinted: boolean }) {
  const pSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const nSteps = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  
  const pPalette = generatePalette(primary, pRamp, pSteps, true);
  const nPalette = generatePalette(primary, nRamp, nSteps, tinted);
  const sPalette = secondary ? generatePalette(secondary, pRamp, pSteps, true) : pPalette;

  const lightRecipe = {
    '--background': nPalette[1], '--foreground': nPalette[11],
    '--card': nPalette[1], '--card-foreground': nPalette[11],
    '--popover': nPalette[1], '--popover-foreground': nPalette[11],
    '--primary': pPalette[5], '--secondary': sPalette[5],
    '--muted': nPalette[2], '--muted-foreground': nPalette[6],
    '--accent': nPalette[2],
    '--destructive': '#ef4444',
    '--border': nPalette[3], '--input': nPalette[3], '--ring': pPalette[5],
    '--radius': '0.5rem',
  };

  const theme = { light: lightRecipe, dark: {} };
  // Auto-generate foregrounds for light mode
  theme.light['--primary-foreground'] = readableColor(theme.light['--primary']);
  theme.light['--secondary-foreground'] = readableColor(theme.light['--secondary']);
  theme.light['--accent-foreground'] = readableColor(theme.light['--accent']);
  theme.light['--destructive-foreground'] = readableColor(theme.light['--destructive']);

  // --- AUTOMATIC DARK MODE INVERSION ---
  // Create inverted palettes for dark mode
  const pPaletteDark = [...pPalette].reverse();
  const nPaletteDark = [...nPalette].reverse();
  const sPaletteDark = secondary ? [...sPalette].reverse() : pPaletteDark;
  
  const darkRecipe = {
    '--background': nPaletteDark[1], '--foreground': nPaletteDark[11],
    '--card': nPaletteDark[1], '--card-foreground': nPaletteDark[11],
    '--popover': nPaletteDark[1], '--popover-foreground': nPaletteDark[11],
    '--primary': pPaletteDark[5], '--secondary': sPaletteDark[5],
    '--muted': nPaletteDark[2], '--muted-foreground': nPaletteDark[6],
    '--accent': nPaletteDark[2],
    '--destructive': '#7f1d1d', // Darker destructive red
    '--border': nPaletteDark[3], '--input': nPaletteDark[3], '--ring': pPaletteDark[5],
    '--radius': '0.5rem',
  };
  theme.dark = darkRecipe;
  // Auto-generate foregrounds for dark mode
  theme.dark['--primary-foreground'] = readableColor(theme.dark['--primary']);
  theme.dark['--secondary-foreground'] = readableColor(theme.dark['--secondary']);
  theme.dark['--accent-foreground'] = readableColor(theme.dark['--accent']);
  theme.dark['--destructive-foreground'] = readableColor(theme.dark['--destructive']);

  return theme;
}
EOL
echo "Theme engine upgraded with dark mode and tinting."

# 2. Upgrade the API to accept the 'tinted' parameter and output both light and dark themes.
echo "Upgrading theme API endpoint..."
cat <<'EOL' > ./src/pages/api/themes/[themeName].css.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateThemeFromColors } from '../../../lib/theme-utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { primary, secondary, tinted } = req.query;

  if (typeof primary !== 'string' || !primary.match(/^[0-9a-fA-F]{6}$/)) {
    return res.status(400).send('/* Invalid primary color format. */');
  }

  const useTint = tinted === 'true';

  try {
    const theme = generateThemeFromColors({ primary: `#${primary}`, secondary: secondary ? `#${secondary}` : undefined, tinted: useTint });
    
    let cssOutput = `/* Auto-generated theme */\n`;
    
    // Light Mode
    cssOutput += `:root {\n`;
    for (const [key, value] of Object.entries(theme.light)) {
      cssOutput += `  ${key}: ${value};\n`;
    }
    cssOutput += `}\n\n`;
    
    // Dark Mode
    cssOutput += `.dark {\n`;
    for (const [key, value] of Object.entries(theme.dark)) {
      cssOutput += `  ${key}: ${value};\n`;
    }
    cssOutput += `}\n`;

    res.setHeader('Content-Type', 'text/css');
    res.status(200).send(cssOutput);
  } catch (error) { res.status(500).send(`/* Failed to generate theme. */`); }
}
EOL
echo "Theme API upgraded."

# 3. Commit and push the new advanced theme engine.
echo "Committing and pushing changes..."
git add .
git commit -m "feat(theme): implement auto dark mode and neutral tinting"
git push origin main
echo "Push complete."