import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
const config = new DataSource({
    type: 'postgres',
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || '',
    ...(process.env.DB_ENTITIES && { entities: [process.env.DB_ENTITIES] }),
    synchronize: false,
    migrations: [process.env.DB_MIGRATIONS],
    migrationsTableName: 'migrations',
    uuidExtension: 'pgcrypto',
});

export default config;