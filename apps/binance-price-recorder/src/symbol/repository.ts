import { AbstractRepository } from '@narwhal-project-ts/database';
import { ISymbol } from './definition';

export class Repository extends AbstractRepository<string, ISymbol> {
  public constructor() {
    super('symbol');
  }

  protected map(name: string) {
    return {
      name,
    };
  }
}
