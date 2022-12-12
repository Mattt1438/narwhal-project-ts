import { Request, Response } from 'express';
import { Service } from './service';

export class Controller {
  public static async getHistory(
    request: Request,
    response: Response,
  ): Promise<void> {
    const { symbol } = request.params;
    const { step } = request.query;

    const start = new Date(request.query.start?.toString());
    const end = new Date(request.query.end?.toString());

    const datas = await Service.getHistory(
      symbol.toUpperCase(),
      start,
      end,
      step.toString(),
    );

    response.send(datas);
  }

  private constructor() {}
}
