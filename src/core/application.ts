import { BinanceStream } from '../binance';
import { DbClient } from '../database';

export class Application {
  constructor(private streams: BinanceStream[]) {}

  public async init(): Promise<void> {
    // Catch Ctrl+C to kill the process
    process.on('SIGINT', () => {
      this.dispose();
      process.exit();
    });

    // Prevent the process from exiting
    process.stdin.resume();

    await DbClient.init();
  }

  public run(): void {
    this.streams.forEach((stream) => stream.listen());
  }

  public dispose(): void {
    this.streams.map((stream) => stream.dispose());
  }
}
