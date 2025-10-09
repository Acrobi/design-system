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