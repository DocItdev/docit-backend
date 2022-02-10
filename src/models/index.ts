import { Sequelize } from 'sequelize';
import config from '../config/dbConfig';
import createUserModel from './User';
import createProjectModel from './Project';

const sequelize = new Sequelize(
  config.dbName, config.dbUsername, config.dbPassword, config.postgres);

const User = createUserModel(sequelize);
const Project = createProjectModel(sequelize);

export { sequelize, User, Project }
