import { Sequelize, DataTypes, Model } from 'sequelize';
import  Project  from './Project';
import ProjectInstance from './Project';

export interface UserInstance extends Model {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }

export default (sequelize: Sequelize) => {
    const User = sequelize.define<UserInstance>("User", {
        id: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        firstName: {
          type: DataTypes.STRING, 
          allowNull: false
        },
        lastName: {
          type: DataTypes.STRING, 
          allowNull: false
        }
      });

      User.hasMany(Project);
    return User;
  };