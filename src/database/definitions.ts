import { Knex } from 'knex';

export type TMigrationFn = (conn: Knex) => Promise<void>;

export interface IHypertableSize {
  /** size in bytes */
  beforeCompression: number;
  /** size in bytes */
  afterCompression: number;
}
