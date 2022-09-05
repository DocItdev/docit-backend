import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config";
import FileRecord from "../mediastorage/mediastorage.model";

export class Document extends Model {
  declare id: string;
  declare name: string;
}

Document.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  }
  
}, { sequelize });

// Document.hasMany(Post);
// Post.belongsTo(Document);
Document.hasMany(FileRecord);
FileRecord.belongsTo(Document);

export default Document;
