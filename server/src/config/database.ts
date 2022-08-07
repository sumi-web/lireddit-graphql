import path from 'path';
import { DataSource } from 'typeorm';
import { Environment } from '../utils/environment';

export const Database = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: Environment.dbUserName,
  password: Environment.dbPassword,
  database: Environment.dbName,
  synchronize: true,
  logging: true,
  entities: [path.join(__dirname, '..', 'entities/**/*.{js,ts}')],
  subscribers: [],
  migrations: []
});
