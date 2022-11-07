'use strict';

module.exports = ( sequelize, DataTypes ) => {
    const Message = sequelize.define( 'Message', {
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Message is required'
                },
                notEmpty: {
                    msg: 'Message is required'
                }
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'User ID is required'
                },
                notEmpty: {
                    msg: 'User ID is required'
                }
            },
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        roomId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Room ID is required'
                },
                notEmpty: {
                    msg: 'Room ID is required'
                }
            },
            references: {
                model: 'Rooms',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'Message',
    } );
    return Message;
}