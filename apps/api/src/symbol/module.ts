import { Router } from 'express';
import { IModule } from '../core';
import { Controller } from './controller';

export class Module implements IModule {
  public readonly path = '/symbol';

  public get router(): Router {
    return Router().get('/:symbol/history', Controller.getHistory);
  }
}
