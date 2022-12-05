import { Knex } from 'knex';
import { TMigrationFn } from '../definitions';

export const up: TMigrationFn = async (conn: Knex) => {
  await conn.schema.createTable('symbol', (table) => {
    table.increments('id').primary();
    table.string('name', 16).unique().notNullable();
  });

  await conn.schema.createTable('history', (table) => {
    table.dateTime('time').notNullable();
    table.smallint('symbol_id').notNullable();
    table.decimal('last_price', 20, 8);
    table.decimal('open_price', 20, 8);
    table.decimal('asset_volume', 20, 8);
    table.primary(['time', 'symbol_id']);
  });

  await conn.raw(
    "SELECT create_hypertable('history','time', chunk_time_interval => interval '1 hours');",
  );
  await conn.raw(
    'CREATE INDEX ix_symbol_id_time ON history (symbol_id, time DESC);',
  );
  await conn.raw(
    "ALTER TABLE history SET ( timescaledb.compress, timescaledb.compress_orderby = 'time', timescaledb.compress_segmentby = 'symbol_id');",
  );
  await conn.raw(
    "SELECT add_compression_policy('history', INTERVAL '1 hours');",
  );
};

export const down: TMigrationFn = async (conn: Knex) => {
  await conn.schema.dropTableIfExists('history');
  await conn.schema.dropTableIfExists('symbol');
};
