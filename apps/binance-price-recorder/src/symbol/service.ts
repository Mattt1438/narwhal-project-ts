import * as NodeCache from 'node-cache';
import { ISymbol } from './definition';
import { Repository } from './repository';

export class Service {
  private static readonly cache = new NodeCache({ checkperiod: 0 });

  private static readonly repository = new Repository();

  public static async getSymbolByName(name: string): Promise<ISymbol> {
    const symbol = this.cache.get<ISymbol>(name);

    if (symbol) {
      return symbol;
    }

    return this.upsertSymbol(name);
  }

  private static upsertSymbol(name: string): Promise<ISymbol> {
    return this.repository.upsert(name).then((symbol) => {
      this.cache.set(symbol.name, symbol);
      return symbol;
    });
  }

  private constructor() {}
}
