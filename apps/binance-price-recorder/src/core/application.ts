import { BinanceStream } from '../binance';
import { Client as DbClient } from '@narwhal-project-ts/database';
import { Logger } from '@narwhal-project-ts/logger';
import { Config } from '../config';

export class Application {
  constructor(private streams: BinanceStream[]) {
    Logger.init(Config.logger).info(
      `${'='.repeat(5)} APPLICATION STARTED ${'='.repeat(5)} `,
    );
  }

  public async init(): Promise<void> {
    await DbClient.init(Config.database);
  }

  public run(): void {
    this.streams.forEach((stream) => stream.listen());
  }

  public dispose(): void {
    this.streams.map((stream) => stream.dispose());
  }
}
