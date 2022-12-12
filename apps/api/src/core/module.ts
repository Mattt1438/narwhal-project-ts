import { IRouter } from 'express';

export interface IModule {
  path: string;
  router: IRouter;
}
