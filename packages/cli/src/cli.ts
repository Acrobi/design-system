import { Command } from 'commander';
import { createThemeCommand } from './commands/theme.js';
import { logger } from './lib/logger.js';

const program = new Command();

program
  .name('acrobi-design')
  .description('CLI tools for the Acrobi Design System')
  .version('1.0.0');

// Add theme command
program.addCommand(createThemeCommand());

// Info command
program
  .command('info')
  .description('Show design system information')
  .action(() => {
    logger.title('Acrobi Design System');
    logger.log('Version: 1.0.0');
    logger.log('');
    logger.log('Packages:');
    logger.log('  • @acrobi/design-tokens     - Design tokens (primitives, themes)');
    logger.log('  • @acrobi/design-primitives - Primitive components');
    logger.log('  • @acrobi/design-icons      - Icon system');
    logger.log('  • @acrobi/design-composites - Composite components');
    logger.log('  • @acrobi/design-themes     - Theme management');
    logger.log('  • @acrobi/design-sensory    - Sensory feedback (Acrobi Extension)');
    logger.log('  • @acrobi/design-cli        - CLI tools');
    logger.log('  • @acrobi/design-system     - Meta-package');
    logger.log('');
    logger.success('Design system information displayed');
  });

// Parse arguments
program.parse();
