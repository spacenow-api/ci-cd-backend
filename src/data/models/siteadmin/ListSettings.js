import DataType from 'sequelize';
import Model from '../../sequelize';

const ListSettings = Model.define("ListSettings", {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  typeId: {
    type: DataType.INTEGER,
    allowNull: false
  },

  itemName: {
    type: DataType.STRING
  },

  otherItemName: {
    type: DataType.STRING
  },

  description: {
    type: DataType.STRING
  },

  maximum: {
    type: DataType.INTEGER
  },

  minimum: {
    type: DataType.INTEGER
  },

  startValue: {
    type: DataType.INTEGER
  },

  endValue: {
    type: DataType.INTEGER
  },

  step: {
    type: DataType.STRING
  },

  isEnable: {
    type: DataType.STRING,
    defaultValue: "1"
  },

  photo: {
    type: DataType.STRING
  },

  photoType: {
    type: DataType.STRING
  },

  isMultiPerGuest: {
    type: DataType.BOOLEAN
  }
});

export default ListSettings;