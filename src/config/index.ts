import { Sequelize } from 'sequelize';
import config from './dbConfig';


const sequelize = new Sequelize(config.dbUri, config.postgres);


export { sequelize }
