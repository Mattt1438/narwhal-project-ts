import { IConfig as ILoggerConfig } from '@narwhal-project-ts/logger';
import { IConfig as IDatabaseConfig } from '@narwhal-project-ts/database';
export interface IConfig {
  database: IDatabaseConfig;

  logger: ILoggerConfig;
}
