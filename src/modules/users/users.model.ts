import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config";
import { UserObject } from "./users.interface";


export class User extends Model<UserObject, UserObject> {
  declare id: string;
  declare email: string;
  declare firstName: string;
  declare lastName: string;
}

User.init({
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
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { sequelize });

export default User;