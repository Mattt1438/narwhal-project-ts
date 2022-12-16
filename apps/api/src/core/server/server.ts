import { IModule } from '../module';
import { Server as HttpServer, createServer } from 'http';
import { Logger } from '@narwhal-project-ts/logger';
import * as express from 'express';
import { Middlewares } from './middlewares';
import { AddressInfo } from 'net';

export class Server {
  private server: HttpServer;

  constructor(modules: IModule[]) {
    const application = modules
      .reduce((app, { routes }) => {
        routes.forEach((route) => {
          app[route.verb](route.path, (req, res, next) =>
            route.handler(req, res).catch(next),
          );
        });
        return app;
      }, express())
      .use(Middlewares.errorHandler);

    this.server = createServer(application);
    this.server.on('error', Logger.error);
  }

  public listen(port?: number): void {
    this.server.listen(port ?? process.env.port ?? 3333, () => {
      const serverInfo = this.server.address() as AddressInfo;
      Logger.info(`Listening at http://localhost:${serverInfo.port}/api`);
    });
  }

  public dispose(): Promise<void> {
    return new Promise((resolve) => {
      this.server.on('close', resolve);
      this.server.close()?.closeAllConnections();
    });
  }
}
