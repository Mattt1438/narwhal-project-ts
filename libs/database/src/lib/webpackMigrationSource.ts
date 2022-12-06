/* eslint-disable @typescript-eslint/no-explicit-any */
import * as path from 'path';

export class WebpackMigrationSource {
  constructor(private migrationContext: any) {}

  getMigrations() {
    return Promise.resolve(this.migrationContext.keys().sort());
  }

  getMigrationName(migration: any) {
    return path.parse(migration).base;
  }

  getMigration(migration: any) {
    return this.migrationContext(migration);
  }
}
