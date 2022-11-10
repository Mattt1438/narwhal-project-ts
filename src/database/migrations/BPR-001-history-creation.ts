import { Knex } from 'knex';
import { TMigrationFn } from '../definitions';

export const up: TMigrationFn = async (conn: Knex) => {
  return conn.schema.createTable('price_history', (table) => {
    table.dateTime('timestamp').notNullable();
    table.string('symbol', 32).notNullable();
    table.specificType('ticker', 'nvarchar(MAX)');
    table.primary(['timestamp', 'symbol']);
  });
};

export const down: TMigrationFn = async (conn: Knex) => {
  conn.schema.dropTableIfExists('history');
};
