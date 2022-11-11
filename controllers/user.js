const sequelize = require('../config/db')

const getAll = async (req, res) => {
  return await sequelize.models.users.findAndCountAll()
    .then(data => res.json(data))
    .catch(err => res.json({ message: 'Error', data: err }))
}

module.exports = {
  getAll
}