import { Application } from './core';
import { TickerStream } from './ticker';

(async () => {
  await Application.init([TickerStream]);

  Application.run();
})().catch((err) => {
  console.error('Unexpected exception', err);
  process.exit(-1);
});
