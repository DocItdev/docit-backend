import { DataTypes, Model } from "sequelize";
import { sequelize } from ".";
import Post from "./Post";

export interface DocumentInstance extends Model {
  id: string;
  name: string;
}

const Document = sequelize.define<DocumentInstance>("Document", {
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
  
});

Document.hasMany(Post);
Post.belongsTo(Document);

export default Document;
