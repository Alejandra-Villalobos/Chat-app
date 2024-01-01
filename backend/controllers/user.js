const User = require("../models/user");
const Token = require("../controllers/token");
const Chat = require("../models/chat");

module.exports.findByEmail = async (req, res, next) => {
  try {
    const { email } = req.query;
    const { rows } = await User.findOneByEmail({ email: email });
    if (rows[0]) {
      return res.status(200).json({ data: rows[0] });
    }
    res.status(200).json({ message: "User not found" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.findAllUsersFilter = async (req, res, next) => {
  try {
    const authUser = await Token.userAuth(req, res, next);
    const { email } = req.query;
    const { rows } = await User.findAll();
    for (const user of rows) {
      const data = await Chat.exists({
        first_user_id: authUser.user_id,
        second_user_id: user.user_id,
      });

      user.chat_exists = data.rowCount > 0;
    }

    if (email) {
      const filteredUsers = rows.filter((user) => user.email.includes(email));
      return res.status(200).json({ data: filteredUsers });
    }
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
