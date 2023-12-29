const User = require("../models/user");

module.exports.findByEmail = async (req, res, next) => {
    try {
      const { email } = req.query;
      const { rows } = await User.findOneByEmail({ email: email })
      if(rows[0]){
        return res.status(200).json({ data: rows[0] });
      }
      res.status(200).json({ message: 'User not found' });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };

  module.exports.findAllUsersFilter = async (req, res, next) => {
    try {
      const { email } = req.query;
      const { rows } = await User.findAll()
      if(email){
        const filteredUsers = rows.filter((user) => user.email.includes(email))
        return res.status(200).json({ data: filteredUsers });
      }
      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };