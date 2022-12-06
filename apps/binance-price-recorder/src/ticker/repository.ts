import { AbstractRepository } from '@narwhal-project-ts/database';
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
    const roundFn = (valueStr: string, precision: number): number => {
      const coef = Math.pow(10, precision);
      return Math.round(Number(valueStr) * coef) / coef;
    };
    const symbol = await SymbolService.getSymbolByName(data.s);
    const r = {
      time: new Date(Math.round(data.E / 1000) * 1000),
      symbol_id: symbol.id,
      last_price: roundFn(data.c, 8),
      open_price: roundFn(data.o, 8),
      asset_volume: roundFn(data.q, 8),
    };
    return r;
  }
}
