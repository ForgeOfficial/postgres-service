const {DataTypes} = require("sequelize");

module.exports = (postgresService) => {
    return postgresService.sequelize.define(__filename.split(/\\/g).pop().slice(0, -3), {
        user_id: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true
        },
        permissions: {
            type: DataTypes.JSONB,
            allowNull: false
        },
        groupPermissions: {
            type: DataTypes.JSONB,
            allowNull: false
        }
    });
};