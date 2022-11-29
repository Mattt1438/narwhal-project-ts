import { Client } from './client';
import { IHypertableSize } from './definitions';

export abstract class AbstractRepository<I, O> {
  protected get queryBuilder() {
    return Client.knex(this.tableName);
  }

  public constructor(protected readonly tableName: string) {}

  public upsert(data: I): Promise<O> {
    return this.queryBuilder
      .insert(this.map.bind(this)(data), '*')
      .onConflict('name')
      .merge()
      .then((result) => result[0]);
  }

  public insertBulk(datas: I[]): Promise<void> {
    const persistedDatas = datas.map(this.map.bind(this));

    return this.queryBuilder.insert(persistedDatas).then();
  }

  public getStorageSize(): Promise<IHypertableSize> {
    return Client.knex
      .select('before_compression_total_bytes', 'after_compression_total_bytes')
      .fromRaw(`hypertable_compression_stats('${this.tableName}')`)
      .then((result) => {
        const row = result[0];
        return {
          beforeCompression: row.before_compression_total_bytes,
          afterCompression: row.after_compression_total_bytes,
        };
      });
  }

  public getRowCount(): Promise<number> {
    return this.queryBuilder.count().then((result) => Number(result[0].count));
  }

  protected abstract map(datas: I): unknown;
}
