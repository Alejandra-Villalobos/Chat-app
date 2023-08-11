const User = require("../models/user");
const Chat = require("../models/chat");
const Token = require("../controllers/token");

module.exports.create = async (req, res, next) => {
  try {
    const authUser = await Token.userAuth(req, res, next);
    const { email } = req.body;
    const { rows } = await User.findOneByEmail({ email: email });
    if (rows[0]) {
      try {
        const verifyFirst = await Chat.exists({
          first_user_id: authUser.user_id,
          second_user_id: rows[0].user_id,
        });
        const verifySecond = await Chat.exists({
          first_user_id: rows[0].user_id,
          second_user_id: authUser.user_id,
        });
        if(verifyFirst.rowCount > 0 || verifySecond.rowCount > 0) return res.status(400).json({ message: "Chat already exists" });
        await Chat.create({
          first_user_id: authUser.user_id,
          second_user_id: rows[0].user_id,
        });
        return res.status(200).json({ message: "Chat created!" });
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    }
    return res.status(400).json({ message: "User not found" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.getAllWithName = async (req, res, next) => {
  try {
    const authUser = await Token.userAuth(req, res, next);
    const { rows } = await Chat.getAllWithName({ user_id:authUser.user_id })
    return res.status(200).json({ rows });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
