const User = require("../models/user");
const Token = require("../models/token");
const TokenController = require("../controllers/token");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = async (user) => {
  const token = jwt.sign(user, 'afneinf');
  await Token.register({ content: token, user_id: user.user_id, active: true });
  return token;
};

module.exports.logout = async (req, res, next) => {
  try {
    const authUser = await TokenController.userAuth(req, res, next);
    if(authUser){
      await Token.deactivate({ user_id: authUser.user_id })
      return res.status(200).json({ message: 'Out!' });
    }
    res.status(400).json({ message: 'Invalid Token' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.register = async (req, res, next) => {
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
  
  module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const args = { email };
      const { rows } = await User.login(args);
      if (rows.length) {
        const { user_id, name, password: password_hash, email } = rows[0];
        const password_is_valid = await bcryptjs.compare(password, password_hash);
        if (password_is_valid) {
          const data_user = { user_id, email, name };
          var token = await generateToken(data_user)
          if(token == null) 
            return res.status(400).json({ message: error });
          return res.status(200).json({ data: data_user, token });
        }
      }
      res.status(400).json({ message: 'Error: email or password not valid' });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
