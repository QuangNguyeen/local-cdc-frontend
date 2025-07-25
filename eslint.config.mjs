import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  { files: ['**/*.ts'], languageOptions: { sourceType: 'commonjs' } },
  {
    languageOptions: {
      globals: globals.node, parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-console': 'error',
      'no-useless-catch': 0,
      '@typescript-eslint/no-unused-vars': ['warn'],
      'prefer-const': ['warn'],
      'no-case-declarations': ['off']
    },
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  prettierConfig

];

export default eslintConfig;
