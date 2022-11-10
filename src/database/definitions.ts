import { Knex } from 'knex';

export type TMigrationFn = (conn: Knex) => Promise<void>;
