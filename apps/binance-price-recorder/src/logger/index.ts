import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger,
} from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { Config } from '../config';

export class Logger {
  private static logger: WinstonLogger;

  public static init() {
    const files: DailyRotateFile[] = Config.logger.files.map(
      (config) =>
        new DailyRotateFile({
          ...config,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: format.combine(format.timestamp(), format.json()),
        }),
    );

    this.logger = createLogger({
      level: 'debug',
      transports: [
        ...files,
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.timestamp(),
            format.printf(({ level, message, timestamp, ...meta }) => {
              const msg = `${timestamp} ${level}: ${message}`;

              if (!meta || !Object.keys(meta).length) {
                return msg;
              }

              return `${msg}\n${JSON.stringify(meta, null, 2)}`;
            }),
          ),
        }),
      ],
    });

    return Logger;
  }

  public static debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public static info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public static warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  public static error(message: string, ...args: unknown[]): void {
    this.logger.error(message, ...args);
  }

  private constructor() {}
}
