import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config";
import { FileRecordType } from './mediastorage.interface';

export class FileRecord extends Model<FileRecordType, FileRecordType> {
  declare id: string;
  declare key: string;
  declare type: string;
}

FileRecord.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, { sequelize });

export default FileRecord;
