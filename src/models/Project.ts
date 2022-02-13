import { DataTypes, Model } from "sequelize";
import { sequelize } from ".";
import Document from "./Document";

export interface ProjectInstance extends Model {
  id: string;
  name: string;
  description: string;
}

const Project = sequelize.define<ProjectInstance>("Project", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Project.hasMany(Document);
Document.belongsTo(Project);

export default Project;
