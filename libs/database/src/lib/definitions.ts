import { Knex } from 'knex';

export interface IConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export type TMigrationFn = (conn: Knex) => Promise<void>;

export interface IHypertableSize {
  /** size in bytes */
  beforeCompression: number;
  /** size in bytes */
  afterCompression: number;
}
