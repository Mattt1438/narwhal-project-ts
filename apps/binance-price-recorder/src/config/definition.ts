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

  logger: {
    files: {
      level: string;
      filename: string;
    }[];
  };
}
