import { IWsStream } from '@binance/connector';
import { Connector } from './connector';

export abstract class Stream<T = unknown> {
  protected stream?: IWsStream;

  protected get connection() {
    return Connector.client;
  }

  public abstract listen(): void;

  public dispose(): void {
    if (!this.stream) return;

    Connector.client.unsubscribe(this.stream);
  }

  protected parse(dataStr: string): T | undefined {
    try {
      return JSON.parse(dataStr);
    } catch (err) {
      console.error('Error while parsing a message', err);
    }
  }
}
