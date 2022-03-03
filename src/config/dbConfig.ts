import { Options } from 'sequelize';

export default {
  port: process.env.PORT ,
  dbUsername: process.env.DB_USERNAME ,
  dbName: process.env.DB_NAME ,
  dbPassword: process.env.DB_PASSWORD ,
  dbDialect: process.env.DB_DIALECT ,
  postgres: {
    logging: true, // Set this to true to see SQL logs, currently disable.
    host: process.env.DB_HOST ,
    port: parseInt(process.env.BD_PORT ),
    dialect: process.env.DB_DIALECT ,
    operatorAliases: false,
    ssl : true,
    dialectOptions : {
        ssl: {
          require: true,
          rejectUnauthorized: false // <<<<<<< YOU NEED THIS
        }
      },
    pool: {
      maxConnections: 5,
      maxIdleTime: 30
    },
    language: 'en'
  } as Options,
};
