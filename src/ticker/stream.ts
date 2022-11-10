import { BinanceStream } from '../binance';
import { IResponse } from './definition';
import { Repository } from './repository';

export class Stream extends BinanceStream<IResponse[]> {
  private readonly repository = new Repository();

  public listen(): void {
    this.stream = this.connection.tickerWS(null, {
      message: this.onMessage.bind(this),
    });
  }

  private onMessage(dataStr: string): void {
    const datas = this.parse(dataStr);
    if (!datas) return;

    this.repository.insertBulk(datas).catch((err) => {
      console.error('Error while saving datas', err);
    });
  }
}