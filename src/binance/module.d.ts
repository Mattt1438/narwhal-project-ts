// TODO remove when types will be available https://github.com/binance/binance-connector-node/pull/72
declare module '@binance/connector' {
  interface ISpotOptions {
    /** Use it only for REST API */
    baseURL?: string;
    /** Use it only for WS API */
    wsURL?: string;
    reconnectDelay?: number;
  }

  interface IWsCallbacks {
    open?: () => void;
    close?: () => void;
    /**
     * @param data JSON formatted string
     */
    message?: (data: string) => void;
  }

  interface IWsStream {}

  class Spot {
    constructor(
      apiKey: string = '',
      apiSecret: string = '',
      options: ISpotOptions = {}
    );

    public tickerWS: (
      symbol: string | null,
      callbacks: IWsCallbacks
    ) => IWsStreams;

    public unsubscribe(stream: IWsStream): void;
  }
}
