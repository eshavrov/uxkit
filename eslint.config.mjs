import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    files: ["**/*.{js,mjs,ts,tsx}"],
    ignores: ["**/*.test.{ts,tsx}"],

    languageOptions: {
      // common parser options, enable TypeScript and JSX
      parser: tsParser,

      parserOptions: {
        sourceType: "module",
        project: ["./tsconfig.eslint.json"],
      },
    },

    plugins:{
      '@stylistic': stylistic
    },

    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn",
      "no-undef": "warn",
      '@stylistic/indent': ['error', 2],
    },
  },
];
