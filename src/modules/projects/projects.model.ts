import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config";
import Document from "../documents/documents.model";

export class Project extends Model {
  declare id: string;
  declare name: string;
  declare description: string;
}

Project.init({
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
}, {sequelize});

Project.hasMany(Document);
Document.belongsTo(Project);

export default Project;
