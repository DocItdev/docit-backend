import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config";

export class Post extends Model {
  id: string;
  postType: string;
  title: string;
  description: string;
  textContent: string;
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
    type: DataTypes.TEXT('long'),
    allowNull: true,
    unique: false,
  }
  
}, { sequelize });

export default Post;