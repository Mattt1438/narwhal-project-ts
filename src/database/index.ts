import { knex, Knex } from 'knex';
import { Config } from '../core';

export class Database {
  private static client: Knex;

  public static async init(): Promise<true | never> {
    const { database: connection } = Config;

    this.client = knex({
      client: 'mssql',
      connection,
    });

    return this.client.raw('SELECT 1').then(() => {
      console.log('Database connection OK');
      return true;
    });
  }

  private constructor() {}
}
