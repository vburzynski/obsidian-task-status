// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
      ignores: [
        "main.js",
        "node_modules/",
        "test-vault/",
      ]
  },
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { "args": "none" }],
      "@typescript-eslint/ban-ts-comment": "off",
      "no-prototype-builtins": "off",
      "@typescript-eslint/no-empty-function": "off"
    }
  },
  {
    files: [
      ".commitlintrc.js",
      "commitlint.config.js",
      "version-bump.mjs"
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      }
    }
  }
);
