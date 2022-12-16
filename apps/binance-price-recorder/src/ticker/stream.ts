import { BinanceStream } from '../binance';
import { HistoryRepository, IHistoryDTO } from '@narwhal-project-ts/database';
import { Logger } from '@narwhal-project-ts/logger';
import { IResponse } from './definition';
import { filesize } from 'filesize';
import { SymbolService } from '../symbol';

export class Stream extends BinanceStream<IResponse[]> {
  protected readonly endpoint = '!ticker@arr';

  private readonly repository = new HistoryRepository();

  public listen(): void {
    super.listen();

    setInterval(async () => {
      const storageSizes = await this.repository
        .getStorageSize()
        .then(({ beforeCompression, afterCompression }) => ({
          beforeCompression: filesize(beforeCompression),
          afterCompression: filesize(afterCompression),
        }));

      const rowCount = await this.repository.getRowCount();

      Logger.info('Running stats', { storageSizes, rowCount });
    }, 60 * 1000);
  }

  protected async onMessage(datas: IResponse[]): Promise<void> {
    const rows = await Promise.all(datas.map(this.map));

    this.repository.insertBulk(rows).catch((err) => {
      Logger.error('Error while saving datas', err);
    });
  }

  protected async map(data: IResponse): Promise<IHistoryDTO> {
    const roundFn = (valueStr: string, precision: number): number => {
      const coef = Math.pow(10, precision);
      return Math.round(Number(valueStr) * coef) / coef;
    };

    const symbol = await SymbolService.getSymbolByName(data.s);

    return {
      time: new Date(Math.round(data.E / 1000) * 1000),
      symbolId: symbol.id,
      lastPrice: roundFn(data.c, 8),
      openPrice: roundFn(data.o, 8),
      assetVolume: roundFn(data.q, 8),
    };
  }
}
