import { IWsRef, Spot } from '@binance/connector';
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { CloseEvent } from 'ws';
import { Config } from '../core';

/**
 * @param T type of data expected on the stream
 */
export abstract class Stream<T = unknown> {
  protected readonly client = new Spot();

  protected wsRef?: IWsRef;

  protected abstract readonly endpoint: string;

  private get url(): string {
    return `${Config.binance.ws.url}/ws/${this.endpoint}`;
  }

  public listen(): void {
    this.wsRef = this.client.subscribe(this.url, {
      message: (dataStr) => {
        const data = this.parse(dataStr);
        if (data) {
          this.onMessage.bind(this)(data);
        }
      },
    });

    this.wsRef.ws.addEventListener('close', this.onClose.bind(this));
  }

  public dispose(): void {
    if (!this.wsRef) return;

    this.client.unsubscribe(this.wsRef!);
  }

  protected abstract onMessage(data: T): void;

  protected onClose({ code, reason }: CloseEvent): void {
    console.warn(
      `Event 'close' received with code '${code}' and reason '${reason}'`,
    );
    this.wsRef!.ws.resume();
  }

  protected parse(dataStr: string): T | undefined {
    try {
      return JSON.parse(dataStr);
    } catch (err) {
      console.error('Error while parsing a message', err);
    }
  }
}