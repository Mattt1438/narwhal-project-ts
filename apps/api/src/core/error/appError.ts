export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
  ) {
    super(message);
    Error.captureStackTrace(this);
  }
}
