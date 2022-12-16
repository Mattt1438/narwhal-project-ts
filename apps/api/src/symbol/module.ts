import { EHttpVerb, IModule, IRoute } from '../core';
import { Controller } from './controller';

export class Module implements IModule {
  public routes: IRoute[] = [
    {
      verb: EHttpVerb.GET,
      path: '/symbol/:symbol/history',
      handler: Controller.getHistory,
    },
  ];
}
