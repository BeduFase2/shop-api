const sequelize = require('../config/db')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { body } = req
  const user = await sequelize.models.users.findOne({
    where: { email: body.email }
  })

  if (!user) return res.status(401).json({ message: 'Unauthorized' })
  if (!user.validPassword(body.password)) return res.status(401).json({ message: 'Invalid credentials!' })

  const token = jwt.sign({ userId: user.id }, 'secretKey', {
    expiresIn: 3600
  })

  return res.json({ message: 'Athenticated successfully!', token })
}

const signup = async (req, res) => {
  const { body } = req;
  let user = await sequelize.models.users.findOne({
    where: { email: body.email },
  });

  if (user) {
    return res.status(400).json({ message: "this email is already registered" });
  }

  user = await sequelize.models.users.create({
    name: body.name,
    lastname: body.lastname,
    firstSurname: body.firstSurname,
    secondSurname: body.secondSurname,
    email: body.email,
    password: body.password,
    type: 'client',
  })

  await user.save();
  return res.json({ message: 'Your account was created successfully' });
}

module.exports = {
  login,
  signup
}