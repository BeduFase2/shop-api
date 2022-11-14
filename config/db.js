require('dotenv').config();

const { Sequelize } = require('sequelize')

const userModel = require('../models/user')
const productModel = require('../models/product')
const reviewModel = require('../models/review')

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false
  }
)

const models = [userModel, productModel, reviewModel]

for (let model of models)
  model(sequelize)

sequelize.sync({
  force: true
});

module.exports = sequelize