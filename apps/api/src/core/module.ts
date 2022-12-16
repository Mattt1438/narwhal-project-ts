import { Request, Response } from 'express';

export enum EHttpVerb {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}
export interface IRoute {
  verb: EHttpVerb;
  path: string;
  handler: (req: Request, res: Response) => Promise<void>;
}
export interface IModule {
  routes: IRoute[];
}
