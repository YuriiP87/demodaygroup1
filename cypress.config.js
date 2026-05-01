import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl:
      process.env.CYPRESS_API_BASE_URL ||
      'https://your-energy.b.goit.study/api',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: false,
    video: false,
    screenshotOnRunFailure: false,
  },
});
