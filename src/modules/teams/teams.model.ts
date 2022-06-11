import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config";
import { TeamAttributes } from "./teams.interface";

export class Team extends Model<TeamAttributes, TeamAttributes> {
  declare id: string;
  declare title: string;
}

Team.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  }
}, { sequelize });

export default Team;
