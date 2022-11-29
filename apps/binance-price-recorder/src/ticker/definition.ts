export interface IResponse {
  /**
   * @description Best ask price
   * @example '20890.56000000'
   */
  a: string;
  /**
   * @description Best ask quantity
   * @example '0.40304000'
   */
  A: string;
  /**
   * @description Best bid price
   * @example '20890.18000000'
   */
  b: string;
  /**
   * @description Best bid quantity
   * @example '0.00472000'
   */
  B: string;
  /**
   * @description Last price
   * @example '20890.18000000'
   */
  c: string;
  /**
   *
   * @description Statistics close time
   * @type timestamp
   * @example 1667078114217
   */
  C: number;
  /**
   * @description Event type
   * @example '24hrTicker'
   */
  e: string;
  /**
   * @description Event time
   * @type timestamp
   * @example 1667078114251
   */
  E: number;
  /**
   * @description First trade ID
   * @example 2048019263
   */
  F: number;
  /**
   * @description High price
   * @example '21085.00000000'
   */
  h: string;
  /**
   * @description Low price
   * @example '20554.01000000'
   */
  l: string;
  /**
   * @description Last trade Id
   * @example 2054093733
   */
  L: number;
  /**
   * @description Total number of trades
   * @example 6074471
   */
  n: number;
  /**
   * @description Open price
   * @example '20664.34000000'
   */
  o: string;
  /**
   * @description Statistics open time
   * @example 1666991714217
   */
  O: number;
  /**
   * @description Price change
   * @example '225.84000000'
   */
  p: string;
  /**
   * @description Price change percent
   * @example '1.093'
   */
  P: string;
  /**
   * @description Total traded quote asset volume
   * @example '5166569549.13512050'
   */
  q: string;
  /**
   * @description Last quantity
   * @example '0.00386000'
   */
  Q: string;
  /**
   * @description Symbol
   * @example 'BTCUSDT'
   */
  s: string;
  /**
   * @description Total traded base asset volume
   * @example '248427.84927000'
   */
  v: string;
  /**
   * @description Weighted average price
   * @example '20797.06266555'
   */
  w: string;
  /**
   * @description First trade(F)-1 price (first trade before the 24hr rolling window)
   * @example '20664.35000000'
   */
  x: string;
}

export interface IHistoryRow {
  time: Date;
  symbol_id: number;
  last_price: number;
  high_price: number;
  low_price: number;
  open_price: number;
  asset_volume: number;
}
