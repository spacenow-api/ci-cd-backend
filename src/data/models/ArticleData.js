import DataType from "sequelize";
import Model from "../sequelize";

const ArticleData = Model.define("ArticleData", {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  content: {
    type: DataType.TEXT,
  },

  subtitle: {
    type: DataType.TEXT,
  },

  quote: {
    type: DataType.TEXT,
  },

  image: {
    type: DataType.TEXT,
  },

  order: {
    type: DataType.INTEGER,
    allowNull: false
  },

  articleId: {
    type: DataType.INTEGER,
    allowNull: false
  }
});

export default ArticleData;
