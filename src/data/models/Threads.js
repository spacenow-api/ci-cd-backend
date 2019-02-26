import DataType from 'sequelize';
import Model from '../sequelize';

const Threads = Model.define('Threads', {

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

    host: {
        type: DataType.STRING,
        allowNull: false
    },

    guest: {
        type: DataType.STRING,
        allowNull: false
    }
});

export default Threads;  