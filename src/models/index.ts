import { Sequelize } from 'sequelize';
import config from '../config/dbConfig';
import { User } from './User';
import { Project } from './Project';

const sequelize = new Sequelize(
  config.dbName, config.dbUsername, config.dbPassword, config.postgres);


export { sequelize, User, Project }
