import { ErrorRequestHandler } from 'express';
import { Logger } from '@narwhal-project-ts/logger';
import { AppError } from '../error';

export class Middlewares {
  public static get errorHandler(): ErrorRequestHandler {
    return (err: AppError | Error, _req, res, _next) => {
      Logger.error('Unexpected error', err);

      const { message, stack } = err;
      const response =
        process.env.NODE_ENV === 'production'
          ? { message }
          : { message, stack };

      res.status(err instanceof AppError ? err.statusCode : 500).send(response);
    };
  }

  private constructor() {}
}
