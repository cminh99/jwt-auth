const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const {
  loginValidation,
  registerValidation
} = require('../middlewares/validation.middleware');

module.exports = {
  // [POST] /api/auth/login
  async postLogin(req, res, next) {
    const data = { ...req.body };

    // Validation data
    const { error } = await loginValidation(data);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    // Check user is already exist
    const user = await User.findOne({ email: data.email });
    if (!user) {
      res.status(400).send('Email does not exists');
      return;
    }

    // Hash and check correct password
    const isValidPass = await bcrypt.compare(data.password, user.password);
    if (!isValidPass) {
      res.status(400).send('Invalid password');
      return;
    }

    // Create and assign token
    const token = jwt.sign({ _id: user._id }, 'secret_string');
    res.header('auth-token', token).send(token);
  },

  // [POST] /api/auth/register
  async postRegister(req, res, next) {
    const data = { ...req.body };

    // Validation data
    const { error } = await registerValidation(data);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    // Check user is already exist
    const emailExist = await User.findOne({ email: data.email });
    if (emailExist) {
      res.status(400).send('Email already exists');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    // Create new user
    try {
      const user = new User(data);
      await user.save();
      res.send(user, user._id);
    } catch (error) {
      res.status(400).send(error);
    }
  }
};
