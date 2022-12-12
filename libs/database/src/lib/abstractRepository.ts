import { Client } from './client';
import { IHypertableSize } from './definitions';

type TObject = { [k: string | number | symbol]: unknown };
export abstract class AbstractRepository<DTO extends { [key: string]: any }> {
  protected abstract mapping: { [key in keyof DTO]: string };

  protected get queryBuilder() {
    return Client.knex(this.tableName);
  }

  public constructor(protected readonly tableName: string) {}

  public upsert(data: DTO): Promise<DTO | undefined> {
    return this.queryBuilder
      .insert(this.toRow(data), '*')
      .onConflict('name')
      .merge()
      .then((result) => this.toDTO(result[0]));
  }

  public insertBulk(datas: DTO[]): Promise<void> {
    const persistedDatas = datas.map(this.toRow.bind(this));

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

  protected toRow(data: DTO): object {
    return Object.entries<string>(this.mapping).reduce(
      (obj, [dtoKey, rowKey]) => ({
        ...obj,
        [rowKey]: data?.[dtoKey],
      }),
      {},
    );
  }

  protected toDTO(
    data: TObject,
    customMapping: { [key in keyof DTO]?: string } = {},
  ): DTO {
    return Object.entries<string>({ ...this.mapping, ...customMapping }).reduce(
      (obj, [dtoKey, rowKey]) => ({
        ...obj,
        [dtoKey]: data?.[rowKey],
      }),
      {} as DTO,
    );
  }
}
