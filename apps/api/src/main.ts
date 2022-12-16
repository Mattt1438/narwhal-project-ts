import { Application } from './core';

const app = new Application();

// Catch Ctrl+C to kill the process
process.on('SIGINT', async () => {
  await app.dispose();
  process.exit();
});

// process.on('uncaughtException', (err) => {
// Logger.error('Uncaught exception:', err);
// process.exit(-1);/
// });

(async () => {
  await app.init();

  app.run();
})();
