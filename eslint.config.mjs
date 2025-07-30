import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import prettierConfig from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import { dirname } from 'path';
import tsEslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export default tsEslint.config(
    {
        ignores: [
            'node_modules/',
            'dist/',
            'build/',
            '.vscode/',
            '.next/',
            'eslint.config.mjs',
            'commitlint.config.js',
            'postcss.config.mjs',
            'src/types/',
            'src/lib/schemas/',
            'src/lib/api.ts',
        ],
    },

    js.configs.recommended,
    ...compat.extends('next/core-web-vitals'),

    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
            parser: tsEslint.parser,
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@typescript-eslint': tsEslint.plugin,
            react: reactPlugin,
            'react-hooks': reactHooks,
            next: nextPlugin,
        },

        rules: {
            ...tsEslint.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...nextPlugin.configs.recommended.rules,

            'no-console': 'error',
            'no-useless-catch': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            'prefer-const': 'warn',
            'no-case-declarations': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
            'react/self-closing-comp': 'warn',
            'react/no-unstable-nested-components': 'warn',
            'react/jsx-no-useless-fragment': 'warn',
            'react/no-array-index-key': 'warn',
            'next/no-img-element': 'warn',
        },
    },

    prettierConfig,
);
