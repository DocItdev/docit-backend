import { DataTypes, Model } from "sequelize";
import { sequelize } from ".";

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

export default Project;
