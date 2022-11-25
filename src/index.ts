import { Application } from './core';
import { TickerStream } from './ticker';

const app = new Application([new TickerStream()]);

(async () => {
  await app.init();

  app.run();
})().catch((err) => {
  console.error('Unexpected exception', err);
  process.exit(-1);
});
