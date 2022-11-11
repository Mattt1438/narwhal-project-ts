import { knex, Knex } from 'knex';
import { Config } from '../core';

export class Client {
  private static _knex: Knex;

  public static get knex() {
    return this._knex;
  }

  public static async init(): Promise<true | never> {
    const { database: connection } = Config;

    this._knex = knex({
      client: 'pg',
      connection,
      migrations: {
        directory: `${__dirname}/migrations`,
      },
    });

    console.debug('Cheking database connection...');
    const isConnected: true = await this.knex.raw('SELECT 1').then(() => true);
    console.log('Database connection OK');

    console.debug('Applying database migrations');
    await this.knex.migrate.latest();
    console.log('Database migrations OK');

    return isConnected;
  }

  private constructor() {}
}
