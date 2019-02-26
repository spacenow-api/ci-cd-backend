import DataType from "sequelize";
import Model from "../sequelize";

const Article = Model.define("Article", {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  title: {
    type: DataType.STRING,
    allowNull: false
  },

  authorName: {
    type: DataType.STRING,
    allowNull: false
  },

  authorPicture: {
    type: DataType.STRING,
    allowNull: false
  },

  thumbnail: {
    type: DataType.STRING,
    allowNull: false
  },

  description: {
    type: DataType.TEXT,
    allowNull: false
  },

  userId: {
    type: DataType.UUID,
    allowNull: false
  },

  isPublished: {
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },

});

export default Article;
