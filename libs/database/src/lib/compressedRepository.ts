import { BaseRepository } from './baseRepository';
import { IHypertableSize } from './definitions';
import { Client } from './client';

export abstract class CompressedRepository<
  DTO extends { [key: string]: any },
> extends BaseRepository<DTO> {
  public getStorageSize(): Promise<IHypertableSize> {
    return Client.knex
      .select('before_compression_total_bytes', 'after_compression_total_bytes')
      .fromRaw(`hypertable_compression_stats('${this.tableName}')`)
      .then((result) => {
        const row = result[0];
        return {
          beforeCompression: row.before_compression_total_bytes,
          afterCompression: row.after_compression_total_bytes,
        };
      });
  }
}
