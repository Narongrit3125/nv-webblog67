
module.exports = (sequelize, DataTypes) => {
    const Smartphones = sequelize.define('Smartphones', {
        brand: DataTypes.STRING,
        model: DataTypes.STRING,
        pictures: DataTypes.TEXT,
        description: DataTypes.TEXT,
        country: DataTypes.STRING,     
        price:DataTypes.DECIMAL(10, 2),
    })
    return Smartphones
}