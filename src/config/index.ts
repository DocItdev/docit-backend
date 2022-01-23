import dotenv from 'dotenv';
import { Options } from 'sequelize';

dotenv.config();
export default {
  port: process.env.PORT as string,
  dbUsername: process.env.DB_USERNAME as string,
  dbName: process.env.DB_NAME as string,
  dbPassword: process.env.DB_PASSWORD as string,
  dbDialect: process.env.DB_DIALECT as string,
  postgres: {
    logging: true, // Set this to true to see SQL logs, currently disable.
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.BD_PORT as string),
    dialect: process.env.DB_DIALECT as string,
    ssl: true,
    operatorAliases: false,
    pool: {
      maxConnections: 5,
      maxIdleTime: 30
    },
    language: 'en'
  } as Options,
};
