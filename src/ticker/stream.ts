import { BinanceStream } from '../binance';
import { Logger } from '../logger';
import { IResponse } from './definition';
import { Repository } from './repository';

export class Stream extends BinanceStream<IResponse[]> {
  protected readonly endpoint = '!ticker@arr';

  private readonly repository = new Repository();

  protected onMessage(datas: IResponse[]): void {
    this.repository.insertBulk(datas).catch((err) => {
      Logger.error('Error while saving datas', err);
    });
  }
}
