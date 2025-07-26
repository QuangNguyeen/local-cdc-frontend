import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactPlugin from 'eslint-plugin-react';
import nextPlugin from '@next/eslint-plugin-next';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // applied to tsx + ts
  { files: ['**/*.ts', '**/*.tsx'], languageOptions: { sourceType: 'commonjs' } },
  {
    languageOptions: {
      globals: globals.node, parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    }
  },
  pluginJs.configs.recommended,
  reactHooks.configs.recommended,
  reactPlugin.configs.flat.recommended,
  ...tsEslint.configs.recommended,
  {
    plugins: { next: nextPlugin },
    rules: {
      'no-console': 'error',
      'no-useless-catch': 0,
      '@typescript-eslint/no-unused-vars': ['warn'],
      'prefer-const': ['warn'],
      'no-case-declarations': ['off'],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': 'warn',
      'react/no-unstable-nested-components': 'warn',
      'react/jsx-no-useless-fragment': 'warn',
      'react/no-array-index-key': 'warn',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
      'next/no-sync-scripts': 'warn',
      'next/no-img-element': 'warn',
    },
  },
  {
    ignores: [
      'eslint.config.mjs',
      'commitlint.config.js',
      'src/types/',
      'node_modules/',
      'dist/',
      'build/',
      '.vscode/',
      'next',
      'postcss.config.mjs'
    ]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  prettierConfig

];

export default eslintConfig;
