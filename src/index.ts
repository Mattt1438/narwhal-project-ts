import { Application } from './core';

(async () => {
  await Application.init();

  Application.run();
})().catch((err) => {
  console.error('Unexpected exception', err);
  process.exit(-1);
});
