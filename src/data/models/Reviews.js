import DataType from 'sequelize';
import Model from '../sequelize';

const Reviews = Model.define('Reviews', {

  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement : true
  },

  reservationId: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  listId: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  authorId: {
    type: DataType.UUID,
    allowNull: false,
  },

  userId: {
    type: DataType.UUID,
    allowNull: false,
  },

  reviewContent: {
    type: DataType.TEXT,
    allowNull: false,
  },

  rating: {
    type: DataType.FLOAT,
    allowNull: false,
  },

  privateFeedback: {
    type: DataType.TEXT,
  },

  parentId: {
    type: DataType.INTEGER,
    defaultValue: 0
  },

  automated: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  }

});

export default Reviews;  