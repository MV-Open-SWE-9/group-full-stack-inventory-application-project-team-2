const { sequelize, Model, DataTypes } = require('../db.js');

class Item extends Model{};

Item.init({
   name: DataTypes.STRING,
   description: DataTypes.STRING,
   price: DataTypes.INTEGER,
   category: DataTypes.STRING,
   image: DataTypes.STRING
}, {
    sequelize: sequelize,
    modelName: 'Item'
});

module.exports = Item