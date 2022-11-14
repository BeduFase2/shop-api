const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('sales', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  productID: {
    type: DataTypes.INTEGER,
    references: {
        model: 'products',
        key: 'id'
    }
  },
  userID: {
    type: DataTypes.INTEGER,
    references: {
        model: 'users',
        key: 'id'
    }
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  hooks: {
    beforeCreate: function (produt, options) {
      produt.createdAt = new Date();
      produt.updatedAt = new Date();
    },
    beforeUpdate: function (produt, options) {
      produt.updatedAt = new Date();
    },
  },
});