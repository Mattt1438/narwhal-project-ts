import { Client } from './client';

export abstract class AbstractRepository<I, O> {
  protected get queryBuilder() {
    return Client.knex(this.tableName);
  }

  public constructor(protected readonly tableName: string) {}

  public insertBulk(datas: I[]): Promise<void> {
    const persistedDatas = datas.map(this.map.bind(this));

    return this.queryBuilder.insert(persistedDatas).then();
  }

  protected abstract map(datas: I): O;
}
