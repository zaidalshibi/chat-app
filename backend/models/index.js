'use strict';

const { Sequelize, DataTypes } = require( 'sequelize' );
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://zaid:1470@localhost:5432/zaid"
require( 'dotenv' ).config();
const sequelize = new Sequelize( DATABASE_URL );

const User = require( './user.model' )( sequelize, DataTypes );
const Message = require( './message.model' )( sequelize, DataTypes );
const Room = require( './room.model' )( sequelize, DataTypes );

User.hasMany( Message, { foreignKey: 'userId' } );
Message.belongsTo( User, { foreignKey: 'userId' } );

Room.hasMany( Message, { foreignKey: 'roomId' } );
Message.belongsTo( Room, { foreignKey: 'roomId' } );

module.exports = {
    db: sequelize,
    User: User,
    Message: Message,
    Room: Room
};