import { Client as DbClient } from '@narwhal-project-ts/database';
import { Logger } from '@narwhal-project-ts/logger';
import { Config } from '../config';
import { HistoryModule } from '../symbol';
import { IModule } from './module';
import { Server } from './server';

export class Application {
  private readonly modules: (new () => IModule)[] = [HistoryModule];

  private server: Server = new Server(this.modules.map((ctor) => new ctor()));

  constructor() {
    Logger.init(Config.logger).info(
      `${'='.repeat(5)} APPLICATION STARTED ${'='.repeat(5)} `,
    );
  }

  public async init(): Promise<void> {
    await this.initDatabse();
  }

  public run(): void {
    this.server.listen();
  }

  public async dispose(): Promise<void> {
    await this.server.dispose();
  }

  private async initDatabse(): Promise<void> {
    return DbClient.init(Config.database).then();
  }
}
