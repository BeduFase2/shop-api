const sequelize = require('../config/db')

const userModel = sequelize.models.users

const getAll = async (req, res) => {
  return await userModel.findAndCountAll()
    .then(data => res.json(data))
    .catch(err => res.json({ message: 'Error', data: err }))
}

const verify = async (req, res) => {
  try {
    const { user } = req;
    return res.json({name: user.name, email: user.email});
  } catch(e) {
    return res.status(401).json({ message: 'No Autorizado' })
  }
}

module.exports = {
  getAll,
  verify
}