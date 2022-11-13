require('dotenv').config();

const { response } = require('express')
const jwt = require('jsonwebtoken')
const sequelize = require('../config/db')

const userModel = sequelize.models.users

const authenticate = (req, res, next) => {
  const { authorization } = req.headers;

  jwt.verify(authorization, process.env.JWT_SECRETKEY, async (err, decoded) => {
    if(err) {
      console.error(err);
      return res.status(401).json({ message: 'No Autorizado' })
    }
    req.user = await userModel.findOne({ where: { id: decoded.userId } })
    next()
  })
}

module.exports = authenticate