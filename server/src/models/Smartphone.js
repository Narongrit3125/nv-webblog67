// models/Smartphone.js
module.exports = (sequelize, DataTypes) => {
    const Smartphone = sequelize.define('Smartphone', {
        brand: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        model: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        pictures: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
    }, {
        tableName: 'Smartphones',
        timestamps: true, // Set to true to enable automatic timestamps (createdAt, updatedAt)
    });

    return Smartphone;
};
