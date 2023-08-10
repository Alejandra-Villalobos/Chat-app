const User = require("../models/user");

module.exports.findByEmail = async (req, res, next) => {
    try {
      const { email } = req.body;
      const { rows } = await User.findOneByEmail({ email: email })
      if(rows[0]){
        return res.status(200).json({ data: rows[0] });
      }
      res.status(400).json({ message: 'User not found' });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };