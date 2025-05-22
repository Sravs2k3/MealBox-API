// This file is processed and loaded automatically before your test files.

// Suppress uncaught exceptions to prevent test failure on image error
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('An unknown error has occurred')) {
    return false;
  }
});
