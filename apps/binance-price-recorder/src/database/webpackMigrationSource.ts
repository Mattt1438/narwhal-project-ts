import * as path from 'path';

export class WebpackMigrationSource {
  constructor(private migrationContext) {}

  getMigrations() {
    return Promise.resolve(this.migrationContext.keys().sort());
  }

  getMigrationName(migration) {
    return path.parse(migration).base;
  }

  getMigration(migration) {
    return this.migrationContext(migration);
  }
}
