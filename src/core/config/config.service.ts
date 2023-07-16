import { config } from 'dotenv';
config();

export class ConfigService {
  get(key: string): string | undefined {
    if (process.env['env'] === 'dev') {
      return process.env[`DEV_${key}`];
    }
    return process.env[`PROD_${key}`];
  }
}
