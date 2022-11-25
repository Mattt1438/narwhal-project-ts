import { BinanceStream } from '../binance';
import { IResponse } from './definition';
import { Repository } from './repository';

export class Stream extends BinanceStream<IResponse[]> {
  protected readonly endpoint = '!ticker@arr';

  private readonly repository = new Repository();

  protected onMessage(datas: IResponse[]): void {
    this.repository.insertBulk(datas).catch((err) => {
      console.error('Error while saving datas', err);
    });
  }
}
