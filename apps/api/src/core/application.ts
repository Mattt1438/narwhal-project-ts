import { Client as DbClient } from '@narwhal-project-ts/database';
import { Logger } from '@narwhal-project-ts/logger';
import * as express from 'express';
import { Server, createServer } from 'http';
import { Config } from '../config';
import { HistoryModule } from '../symbol';
import { IModule } from './module';

export class Application {
  private server: Server;

  private modules: (new () => IModule)[] = [HistoryModule];

  constructor() {
    Logger.init(Config.logger).info(
      `${'='.repeat(5)} APPLICATION STARTED ${'='.repeat(5)} `,
    );
  }

  public async init(): Promise<void> {
    await this.initDatabse();
    this.initExpress();
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

  private async initDatabse(): Promise<void> {
    return DbClient.init(Config.database).then();
  }

  private initExpress(): void {
    const app = this.modules
      .map((ctor) => new ctor())
      .reduce((acc, { path, router }) => acc.use(path, router), express());

    this.server = createServer(app);
    this.server.on('error', Logger.error);
  }
}
