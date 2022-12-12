require('dotenv').config()

const sequelize = require('../config/db')
const jwt = require('jsonwebtoken')

const userModel = sequelize.models.users

const login = async (req, res) => {
  const { body } = req

  console.log('::::::::::body::::::::::');
  console.log(body);
  
  const user = await userModel.findOne({
    where: { email: body.email }
  })

  console.log('::::::::::user::::::::::');
  console.log(user);

  if (!user) return res.status(401).json({ message: 'No autorizado' })
  if (!user.validPassword(body.password)) return res.status(401).json({ message: 'Usuario o contraseña invalidos' })

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRESIN
  })

  return res.json({ token })
}

const signup = async (req, res) => {
  const { body } = req;
  let user = await userModel.findOne({
    where: { email: body.email },
  });

  if (user) {
    return res.status(400).json({ message: 'El correo ya fue registrado' });
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
  return res.json({ message: 'Registro existoso' });
}

module.exports = {
  login,
  signup
}