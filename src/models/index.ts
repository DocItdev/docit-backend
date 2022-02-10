import { Sequelize } from 'sequelize';
import config from '../config/dbConfig';


const sequelize = new Sequelize(
  config.dbName, config.dbUsername, config.dbPassword, config.postgres);


export { sequelize }
