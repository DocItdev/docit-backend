import { Sequelize } from 'sequelize';
import config from './dbConfig';


const sequelize = new Sequelize(
  config.dbName, config.dbUsername, config.dbPassword, config.postgres);


export { sequelize }
