import globals from "globals";
import pluginJs from "@eslint/js";
import cypressPlugin from "eslint-plugin-cypress";

export default [
  {
    languageOptions: {
      globals: globals.browser,
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
];
