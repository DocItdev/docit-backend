import { DataTypes, Model } from "sequelize";
import { sequelize } from ".";
import  Project  from "./Project";


export interface UserInstance extends Model {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

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
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Project);
Project.belongsTo(User);


// User.hasMany(Project,{
//   foreignKey:{
//     name:'userId'
//   }
// });
// Project.belongsTo(User,{
//   foreignKey:{
//     name:'userId'
//   }
// });


export default User;