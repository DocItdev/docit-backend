import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config";
import Post from "../posts/posts.model";

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

Document.hasMany(Post);
Post.belongsTo(Document);

export default Document;
