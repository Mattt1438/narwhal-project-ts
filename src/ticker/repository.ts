import { AbstractRepository } from '../database';
import { IPersistentData, IResponse } from './definition';

export class Repository extends AbstractRepository<IResponse, IPersistentData> {
  public constructor() {
    super('history');
  }

  public insertBulk(datas: IResponse[]): Promise<void> {
    const persistedDatas = datas.map(this.map.bind(this));

    return this.queryBuilder
      .insert(persistedDatas)
      .onConflict()
      .ignore()
      .then();
  }

  protected map({ E, s, ...rest }: IResponse): IPersistentData {
    return {
      timestamp: new Date(E),
      symbol: s,
      ticker: JSON.stringify(rest),
    };
  }
}
