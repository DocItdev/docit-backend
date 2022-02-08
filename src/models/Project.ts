import { Sequelize, DataTypes, Model } from 'sequelize';
export interface ProjectInstance extends Model {
    id: string;
    name: string;
    description: string;
  }

export default (sequelize: Sequelize) => {
    const Project = sequelize.define<ProjectInstance>("User", {
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
          allowNull: true
        }
      });
    return Project;
  };