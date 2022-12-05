import { IWsRef, Spot } from '@binance/connector';
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { CloseEvent } from 'ws';
import { Config } from '../config';
import { Logger } from '../logger';

/**
 * @param T type of data expected on the stream
 */
export abstract class Stream<T = unknown> {
  protected readonly client = new Spot('', '', { logger: Logger });

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

    this.wsRef.ws.removeAllListeners('ping');
    this.wsRef.ws.on('ping', () => {
      Logger.debug("Responded PONG to server's PING message");
      this.wsRef?.ws.ping();
    });

    this.wsRef.ws.removeAllListeners('pong');
    this.wsRef.ws.on('pong', () => {
      Logger.debug('Received PONG from server');
    });

    this.wsRef.ws.addEventListener('close', this.onClose.bind(this));

    setInterval(() => {
      Logger.debug('Sending a PING...');
      this.wsRef?.ws.ping();
    }, 5000);
  }

  public dispose(): void {
    if (!this.wsRef) return;

    this.client.unsubscribe(this.wsRef);
  }

  protected abstract onMessage(data: T): void;

  protected onClose({ code, reason }: CloseEvent): void {
    Logger.warn(
      `Event 'close' received with code '${code}' and reason '${reason}'`,
    );
    this.wsRef.ws.resume();
  }

  protected parse(dataStr: string): T | undefined {
    try {
      return JSON.parse(dataStr);
    } catch (err) {
      Logger.error('Error while parsing a message', err);
    }
  }
}
