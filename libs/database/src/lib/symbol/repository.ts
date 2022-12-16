import { BaseRepository } from '../baseRepository';
import { IDto } from './definition';

export class Repository extends BaseRepository<IDto> {
  protected mapping: { [key in keyof IDto]: string } = {
    id: 'id',
    name: 'name',
  };

  public constructor() {
    super('symbol');
  }

  public upsert(data: { name: string }): Promise<IDto> {
    return this.queryBuilder
      .insert(this.toRow(data), '*')
      .onConflict('name')
      .merge()
      .then((result) => this.toDTO(result[0]));
  }

  public getByName(name: string): Promise<IDto | undefined> {
    return this.queryBuilder
      .select()
      .where({ name })
      .then((result) => {
        if (!result[0]) {
          return undefined;
        }
        return this.toDTO(result[0]);
      });
  }
}
