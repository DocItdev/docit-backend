import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config";
import { PostObject } from "./posts.interface";

export class Post extends Model<PostObject, PostObject> {
  declare id: string;
  declare postType: string;
  declare title: string;
  declare description: string;
  declare textContent: string;
  declare mediaFilePath: string;
}

Post.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  postType: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  textContent: {
    type: DataTypes.TEXT,
    allowNull: true,
    unique: false,
  },
  index: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: false,
  },
  mediaFilePath: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  
}, { sequelize });

export default Post;