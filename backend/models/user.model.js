'use strict';

module.exports = ( sequelize, DataTypes ) => {
    const User = sequelize.define( 'User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'Username is required'
                },
                notEmpty: {
                    msg: 'Username is required'
                }
            }
        },
    }, {
        sequelize,
        modelName: 'User',
    } );
    return User;
}