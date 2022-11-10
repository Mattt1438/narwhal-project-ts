import { BinanceClient, BinanceStream } from '../binance';
import { DbClient } from '../database';

export class Application {
  private static binanceClient?: BinanceClient;

  public static async init(
    streamCtors: (new () => BinanceStream)[],
  ): Promise<void> {
    // Catch Ctrl+C to kill the process
    process.on('SIGINT', () => {
      this.dispose();
      process.exit();
    });

    // Prevent the process from exiting
    process.stdin.resume();

    await DbClient.init();
    this.binanceClient = new BinanceClient(
      streamCtors.map((ctor) => new ctor()),
    );
  }

  public static run(): void {
    this.binanceClient?.startListening();
  }

  public static dispose(): void {
    this.binanceClient?.dispose();
  }

  private constructor() {}
}
