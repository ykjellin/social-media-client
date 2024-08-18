import globals from "globals";
import pluginJs from "@eslint/js";
import cypressPlugin from "eslint-plugin-cypress";
import pluginJest from "eslint-plugin-jest";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      cypress: cypressPlugin,
    },
    rules: {
      ...cypressPlugin.configs.recommended.rules,
    },
  },
  {
    ignores: [".cypress/*", ".cypress.config.js"],
  },
  {
    files: ["cypress.config.js"],
    rules: {
      "no-unused-vars": "off",
    },
  },
  {
    files: ["**/*.cy.js"],
    languageOptions: {
      globals: { ...globals.cypress },
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
    },
  },
  {
    files: ["**/*.test.js"],
    languageOptions: {
      globals: { ...globals.jest },
    },
    plugins: {
      jest: pluginJest,
    },
    rules: {
      ...pluginJest.configs.recommended.rules,
    },
  },
];
