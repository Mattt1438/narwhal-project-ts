import { WebSocketConnector } from './connector';
import { Stream } from './stream';
import { Ticker } from './ticker';

export class Binance {
  private static streams: Stream<unknown>[];

  public static init(): void {
    WebSocketConnector.init();
    this.streams = [new Ticker()];
  }

  public static startListening(): void {
    this.streams.forEach((stream) => stream.listen());
  }

  public static dispose(): void {
    this.streams.forEach((stream) => stream.dispose());
  }

  private constructor() {}
}
