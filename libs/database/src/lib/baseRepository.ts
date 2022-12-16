import { Client } from './client';

type TObject = { [k: string | number | symbol]: unknown };

export abstract class BaseRepository<DTO extends { [key: string]: any }> {
  protected abstract mapping: { [key in keyof DTO]: string };

  protected get queryBuilder() {
    return Client.knex(this.tableName);
  }

  public constructor(protected readonly tableName: string) {}

  public insertBulk(datas: DTO[]): Promise<void> {
    const persistedDatas = datas.map(this.toRow.bind(this));

    return this.queryBuilder.insert(persistedDatas).then();
  }

  public getRowCount(): Promise<number> {
    return this.queryBuilder.count().then((result) => Number(result[0].count));
  }

  protected toRow(data: Partial<DTO>): object {
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
