import { Options } from 'sequelize';

export default {
  port: process.env.PORT ,
  dbDialect: process.env.DB_DIALECT ,
  dbUri: process.env.DB_URI,
  postgres: {
    logging: false, // Set this to true to see SQL logs, currently disable.
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
