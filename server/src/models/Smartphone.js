
module.exports = (sequelize, DataTypes) => {
    const Smartphone = sequelize.define('Smartphone', {
        brand: DataTypes.STRING,
        model: DataTypes.STRING,
        pictures: DataTypes.TEXT,
        description: DataTypes.TEXT,
        country: DataTypes.STRING,     
        price:DataTypes.DECIMAL(10, 2),
    })
    return Smartphone
}