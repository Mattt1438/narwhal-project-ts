import { IConfig as ILoggerConfig } from '@narwhal-project-ts/logger';
export interface IConfig {
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };

  binance: {
    ws: {
      url: string;
    };
  };

  logger: ILoggerConfig;
}
