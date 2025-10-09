import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Note: Tailwind CSS v4 compatibility issues with eslint-plugin-tailwindcss
      // We'll add custom Tailwind rules later when the plugin supports v4
    },
  },
];

export default eslintConfig;
