import { Binance } from '../binance';

export class Application {
  public static init(): void {
    // Catch Ctrl+C to kill the process
    process.on('SIGINT', () => {
      this.dispose();
      process.exit();
    });

    // Prevent the process from exiting
    process.stdin.resume();

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
