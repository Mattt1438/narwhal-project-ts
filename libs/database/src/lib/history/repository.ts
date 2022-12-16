import { Client } from '../client';
import { CompressedRepository } from '../compressedRepository';
import { IDto } from './definition';

export class Repository extends CompressedRepository<IDto> {
  protected mapping: { [key in keyof IDto]: string } = {
    time: 'time',
    symbolId: 'symbol_id',
    assetVolume: 'asset_volume',
    lastPrice: 'last_price',
    openPrice: 'open_price',
  };

  public constructor() {
    super('history');
  }

  public async insertBulk(datas: IDto[]): Promise<void> {
    const persistedDatas = await Promise.all(datas.map(this.toRow.bind(this)));

    return this.queryBuilder
      .insert(persistedDatas)
      .onConflict()
      .ignore()
      .then();
  }

  public async find(
    symbolId: number,
    start: Date,
    end: Date,
    step: string,
  ): Promise<IDto[]> {
    return this.queryBuilder
      .select(
        Client.knex.raw(`time_bucket('${step}', time) as time_bucket`),
        Client.knex.raw('first(last_price, time) as last_price'),
        Client.knex.raw('first(open_price, time) as open_price'),
        Client.knex.raw('first(asset_volume, time) as asset_volume'),
      )
      .where('symbol_id', symbolId)
      .andWhereBetween('time', [start, end])
      .groupBy('time_bucket')
      .orderBy('time_bucket')
      .then((results) =>
        results.map((result) => this.toDTO(result, { time: 'time_bucket' })),
      );
  }
}
