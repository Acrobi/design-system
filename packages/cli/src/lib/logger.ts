import pc from 'picocolors';

/**
 * Simple logger for CLI output with color support
 */
export const logger = {
  info: (message: string) => {
    console.log(pc.blue('ℹ'), message);
  },

  success: (message: string) => {
    console.log(pc.green('✓'), message);
  },

  warn: (message: string) => {
    console.log(pc.yellow('⚠'), message);
  },

  error: (message: string) => {
    console.log(pc.red('✖'), message);
  },

  title: (message: string) => {
    console.log('\n' + pc.bold(pc.cyan(message)) + '\n');
  },

  log: (message: string) => {
    console.log(message);
  }
};
