const Chat = require("../models/chat");
const Message = require("../models/message");
const Token = require("../controllers/token");

module.exports.create = async (req, res, next) => {
  try {
    const authUser = await Token.userAuth(req, res, next);
    const { content } = req.body;
    const { chatId } = req.params;
    const { rows } = await Chat.existsWithId({ chat_id: chatId });
    if (rows[0]) {
      const verifyUsers = await Chat.userExists({
        chat_id: chatId,
        user_id: authUser.user_id,
      });
      if(verifyUsers.rowCount === 0) return res.status(400).json({ message: "Can't access to chat" });
      try {
        await Message.create({
          sender_id: authUser.user_id,
          chat_id: chatId,
          content: content,
        });
        return res.status(200).json({ message: "Message sent" });
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    }
    return res.status(400).json({ message: "Chat not found" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
