import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config";
import Workspace from "../workspaces/workspaces.model";
import User from "../users/users.model";
import { UserWorkspaceAttributes } from "./userworkspaces.interface";

export class User_Workspace extends Model<UserWorkspaceAttributes, UserWorkspaceAttributes> {
  declare id: string;
}

User_Workspace.init({
  role: {
    type: DataTypes.STRING
  },
}, { sequelize });

User.belongsToMany(Workspace, { through: User_Workspace });
Workspace.belongsToMany(User, { through: User_Workspace });

export default User_Workspace;
