import DataType from 'sequelize';
import Model from '../sequelize';

const Reservation = Model.define("Reservation", {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  listId: {
    type: DataType.INTEGER,
    allowNull: false
  },

  hostId: {
    type: DataType.STRING,
    allowNull: false
  },

  guestId: {
    type: DataType.STRING,
    allowNull: false
  },

  checkIn: {
    type: DataType.DATE,
    allowNull: false
  },

  checkOut: {
    type: DataType.DATE,
    allowNull: false
  },

  guests: {
    type: DataType.INTEGER,
    defaultValue: 1
  },

  message: {
    type: DataType.TEXT
  },

  basePrice: {
    type: DataType.FLOAT,
    allowNull: false
  },

  priceType: {
    type: DataType.STRING,
    allowNull: false
  },

  cleaningPrice: {
    type: DataType.FLOAT
  },

  currency: {
    type: DataType.STRING,
    allowNull: false
  },

  discount: {
    type: DataType.FLOAT
  },

  discountType: {
    type: DataType.STRING
  },

  guestServiceFee: {
    type: DataType.FLOAT
  },

  hostServiceFee: {
    type: DataType.FLOAT
  },

  total: {
    type: DataType.FLOAT,
    allowNull: false
  },

  isMultiPerGuest: {
    type: DataType.BOOLEAN
  },

  confirmationCode: {
    type: DataType.INTEGER
  },

  payoutId: {
    type: DataType.INTEGER
  },

  priceType: {
    type: DataType.STRING
  },

  reservationState: {
    type: DataType.ENUM(
      "pending",
      "expired",
      "approved",
      "declined",
      "completed",
      "cancelled"
    ),
    defaultValue: "pending"
  },

  paymentState: {
    type: DataType.ENUM("pending", "completed"),
    defaultValue: "pending"
  }
});

export default Reservation; 