import { BinanceStream } from '../binance';
import { Logger } from '@narwhal-project-ts/logger';
import { IResponse } from './definition';
import { Repository } from './repository';
import { filesize } from 'filesize';

export class Stream extends BinanceStream<IResponse[]> {
  protected readonly endpoint = '!ticker@arr';

  private readonly repository = new Repository();

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

  protected onMessage(datas: IResponse[]): void {
    this.repository.insertBulk(datas).catch((err) => {
      Logger.error('Error while saving datas', err);
    });
  }
}
