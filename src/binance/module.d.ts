// import * as WebSocketClient from 'ws';
// TODO remove when types will be available https://github.com/binance/binance-connector-node/pull/72
declare module '@binance/connector' {
  import WebSocketClient from 'ws';
  interface ISpotOptions {
    /** Use it only for REST API */
    baseURL?: string;
    /** Use it only for WS API */
    wsURL?: string;
    reconnectDelay?: number;
    logger: object;
  }

  interface IWsCallbacks {
    open?: () => void;
    close?: () => void;
    error?: () => void;
    /**
     * @param data JSON formatted string
     */
    message?: (data: string) => void;
  }

  interface IWsRef {
    closeInitiated: boolean;
    ws: WebSocketClient;
  }

  class Spot {
    constructor(
      apiKey: string = '',
      apiSecret: string = '',
      options: ISpotOptions = {}
    );

    public subscribe(url: string, callbacks: IWsCallbacks): IWsRef;

    public unsubscribe(stream: IWsRef): void;
  }
}
