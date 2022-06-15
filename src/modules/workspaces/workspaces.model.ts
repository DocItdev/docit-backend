import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config";
import Workspace from "./workspaces";
import { WorkspaceAttributes } from "./workspaces.interface";

export class Team extends Model<WorkspaceAttributes, WorkspaceAttributes> {
  declare id: string;
  declare title: string;
}

Team.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  }
}, { sequelize });

export default Workspace;
