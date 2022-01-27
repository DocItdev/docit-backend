import { Sequelize, DataTypes, Model } from 'sequelize';
export interface UserInstance extends Model {
    id: number;
    name: string;
  }

export default (sequelize: Sequelize) => {
    const User = sequelize.define<UserInstance>("User", {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
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
    return User;
  };