import { Sequelize, DataTypes, Model } from 'sequelize';
interface UserInstance extends Model {
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
        name: {
          type: DataTypes.STRING,
        },
      });
    return User;
  };