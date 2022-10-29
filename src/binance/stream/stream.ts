import { IWsStream } from '@binance/connector';
import { WebSocketConnector } from '../connector';

export abstract class Stream<T> {
  protected stream?: IWsStream;

  public abstract listen(): void;

  public dispose(): void {
    if (!this.stream) return;

    WebSocketConnector.client.unsubscribe(this.stream);
  }

  protected parse(dataStr: string): T | undefined {
    try {
      return JSON.parse(dataStr);
    } catch (err) {
      console.error('Error while parsing a message', err);
    }
  }
}
