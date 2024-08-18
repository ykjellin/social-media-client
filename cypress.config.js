import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    defaultCommandTimeout: 60000,
    pageLoadTimeout: 60000,
  },
});
