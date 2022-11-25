import { BinanceStream } from '../binance';
import { DbClient } from '../database';
import { Logger } from '../logger';

export class Application {
  constructor(private streams: BinanceStream[]) {
    Logger.init().info(
      `${'='.repeat(5)} APPLICATION STARTED ${'='.repeat(5)} `,
    );
  }

  public async init(): Promise<void> {
    await DbClient.init();
  }

  public run(): void {
    this.streams.forEach((stream) => stream.listen());
  }

  public dispose(): void {
    this.streams.map((stream) => stream.dispose());
  }
}
