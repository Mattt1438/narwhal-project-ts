import {
  SymbolRepository,
  HistoryRepository,
  IHistoryDTO,
} from '@narwhal-project-ts/database';
import { NotFoundError } from '../core/error';

export class Service {
  private static readonly repository = new SymbolRepository();

  private static readonly historyRepository = new HistoryRepository();

  public static async getHistory(
    symbolName: string,
    start: Date,
    end: Date,
    step: string,
  ): Promise<IHistoryDTO[]> {
    const symbol = await this.repository.getByName(symbolName);

    if (!symbol) {
      throw new NotFoundError(`Symbol '${symbolName}' not found`);
    }
    return this.historyRepository.find(symbol.id, start, end, step);
  }

  private constructor() {}
}
