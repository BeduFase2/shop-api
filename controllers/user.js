const sequelize = require('../config/db')

const userModel = sequelize.models.users

const getAll = async (req, res) => {
  return await userModel.findAndCountAll()
    .then(data => res.json(data))
    .catch(err => res.json({ message: 'Error', data: err }))
}

module.exports = {
  getAll
}