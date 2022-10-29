import { Spot } from '@binance/connector';

export class Connector {
  private static _client: Spot;

  public static get client(): Spot {
    return this._client;
  }

  public static init(): void {
    this._client = new Spot();
  }

  private constructor() {}
}
