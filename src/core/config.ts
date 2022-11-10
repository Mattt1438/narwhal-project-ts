import NodeConfig from 'config';

export class Config {
  public static get database() {
    return {
      host: this.readConfigKey('database.host'),
      port: this.readConfigKey<number>('database.port'),
      user: this.readConfigKey('database.user'),
      password: this.readConfigKey('database.password'),
      database: this.readConfigKey('database.database'),
    };
  }

  private static readConfigKey<T = string>(key: string): T | never {
    if (!NodeConfig.has(key)) {
      throw new Error(`Config key "${key}" is missing`);
    }
    return NodeConfig.get(key);
  }

  private constructor() {}
}
