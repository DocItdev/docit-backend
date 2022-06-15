import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config";
import Project from "../projects/projects.model";
import { WorkspaceAttributes } from "./workspaces.interface";

export class Workspace extends Model<WorkspaceAttributes, WorkspaceAttributes> {
  declare id: string;
  declare title: string;
  declare description: string;
}

Workspace.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  personal: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
}, { sequelize });

Workspace.hasMany(Project);
Project.belongsTo(Workspace);

export default Workspace;
