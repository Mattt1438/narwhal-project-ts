import { AbstractRepository } from '../database';
import { SymbolService } from '../symbol';
import { IHistoryRow, IResponse } from './definition';

export class Repository extends AbstractRepository<IResponse, IHistoryRow> {
  public constructor() {
    super('history');
  }

  public async insertBulk(datas: IResponse[]): Promise<void> {
    const persistedDatas = await Promise.all(datas.map(this.map.bind(this)));

    return this.queryBuilder
      .insert(persistedDatas)
      .onConflict()
      .ignore()
      .then();
  }

  protected async map(data: IResponse): Promise<IHistoryRow> {
    const symbol = await SymbolService.getSymbolByName(data.s);
    return {
      time: new Date(Math.round(data.E / 1000) * 1000),
      symbol_id: symbol.id,
      last_price: Number(data.c),
      high_price: Number(data.h),
      low_price: Number(data.l),
      open_price: Number(data.o),
      asset_volume: Number(data.q),
    };
  }
}
