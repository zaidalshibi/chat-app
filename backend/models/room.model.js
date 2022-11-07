'use strict';

module.exports = ( sequelize, DataTypes ) => {
    const Room = sequelize.define( 'Room', {}, {
        sequelize,
        modelName: 'Room',
    } );
    return Room;
};