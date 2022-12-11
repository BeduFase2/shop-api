require('dotenv').config();

const { Sequelize } = require('sequelize')

const userModel = require('../models/user')
const productModel = require('../models/product')
const reviewModel = require('../models/review')
const saleModel = require('../models/sale')

const sequelize = new Sequelize(process.env.DATABASE_URL)

const models = [userModel, productModel, reviewModel]

for (let model of models)
  model(sequelize)

sequelize.sync({
  force: true
});

module.exports = sequelize