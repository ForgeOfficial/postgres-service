const { DataTypes } = require('sequelize');

module.exports = (postgresService) => {
    return postgresService.sequelize.define(__filename.split(/\\/g).pop().slice(0, -3), {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        indexes: [
            {
                fields: ['email'],
            },
            {
                fields: ['username'],
            },
        ],
    });
}