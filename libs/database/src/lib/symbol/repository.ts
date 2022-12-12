import { AbstractRepository } from '../abstractRepository';
import { IDto } from './definition';

export class Repository extends AbstractRepository<IDto> {
  protected mapping: { [key in keyof IDto]: string } = {
    id: 'id',
    name: 'name',
  };

  public constructor() {
    super('symbol');
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
