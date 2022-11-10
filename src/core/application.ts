import { Binance } from '../binance';
import { Database } from '../database';

export class Application {
  public static async init(): Promise<void> {
    // Catch Ctrl+C to kill the process
    process.on('SIGINT', () => {
      this.dispose();
      process.exit();
    });

    // Prevent the process from exiting
    process.stdin.resume();

    await Database.init();
    Binance.init();
  }

  public static run(): void {
    Binance.startListening();
  }

  public static dispose(): void {
    Binance.dispose();
  }

  private constructor() {}
}
