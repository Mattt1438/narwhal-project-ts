import 'pg';
import { knex, Knex } from 'knex';
import { Config } from '../config';
import { Logger } from '../logger';
import { WebpackMigrationSource } from './webpackMigrationSource';

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
        migrationSource: new WebpackMigrationSource(
          require.context('./migrations', false, /\.ts$/),
        ),
      },
    });

    Logger.debug('Cheking database connection...');
    const isConnected: true = await this.knex.raw('SELECT 1').then(() => true);
    Logger.info('Database connection OK');

    Logger.debug('Applying database migrations');
    await this.knex.migrate.latest();
    Logger.info('Database migrations OK');

    return isConnected;
  }

  private constructor() {}
}
