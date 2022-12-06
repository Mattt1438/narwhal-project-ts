import { Client as DbClient } from '@narwhal-project-ts/database';
import { Logger } from '@narwhal-project-ts/logger';
import * as express from 'express';
import { Server, createServer } from 'http';
import { Config } from '../config';

export class Application {
  private server: Server;

  constructor() {
    Logger.init(Config.logger).info(
      `${'='.repeat(5)} APPLICATION STARTED ${'='.repeat(5)} `,
    );
  }

  public async init(): Promise<void> {
    await DbClient.init(Config.database);
    this.server = createServer(express());
    this.server.on('error', Logger.error);
  }

  public run(): void {
    const port = process.env.port || 3333;
    this.server.listen(port, () => {
      Logger.info(`Listening at http://localhost:${port}/api`);
    });
  }

  public dispose(): Promise<void> {
    return new Promise((resolve) => {
      this.server.on('close', resolve);
      this.server.close()?.closeAllConnections();
    });
  }
}
