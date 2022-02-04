import { Sequelize } from 'sequelize';
import config from '../config/dbConfig';
import createUserModel from './User';

const sequelize = new Sequelize(
  config.dbName, config.dbUsername, config.dbPassword, config.postgres);

const User = createUserModel(sequelize);


export { sequelize, User }
