const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.registerUser = async (req, res, next) => {
    const { email, name, password } = req.body;
    try {
      const password_hash = await bcryptjs.hash(password, 12);
      const args = { email, name, password: password_hash };
      await User.register(args);
      res.status(200).json({ message: 'User created!' });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
  
  module.exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const args = { email };
      const { rows } = await User.login(args);
      if (rows.length) {
        const { user_id, name, password: password_hash, email } = rows[0];
        const password_is_valid = await bcryptjs.compare(password, password_hash);
        if (password_is_valid) {
          const data_user = { user_id, email, name };
          return res.status(200).json({ data: data_user });
        }
      }
      res.status(400).json({ message: 'Error: email or password not valid' });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };

  module.exports.findAllUsers = async (req, res, next) => {
    try {
        const { rows } = await User.findAll();
      res.status(200).json({ data: rows[0] });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };