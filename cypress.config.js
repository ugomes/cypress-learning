
const { defineConfig } = require('cypress');


module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      reportFilename: 'relatorio-curso-cypress'
    },
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    video: true,
    videosFolder: 'cypress/videos',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    }
  }
});
