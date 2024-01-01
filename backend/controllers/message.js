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
      if (verifyUsers.rowCount === 0)
        return res.status(400).json({ message: "Can't access to chat" });
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

module.exports.getAll = async (req, res, next) => {
  try {
    const authUser = await Token.userAuth(req, res, next);
    const { chatId } = req.params;
    const { page, limit } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const { rows } = await Chat.existsWithId({ chat_id: chatId });
    if (rows[0]) {
      const verifyUsers = await Chat.userExists({
        chat_id: chatId,
        user_id: authUser.user_id,
      });
      if (verifyUsers.rowCount === 0)
        return res.status(400).json({ message: "Can't access to chat" });
      try {
        const messages = await Message.getAll({ chat_id: chatId });
        //Mostrar los mensajes paginados en el orden correcto
        return res
          .status(200)
          .json({
            data: messages.rows.reverse().slice(startIndex, endIndex).reverse(),
          });
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    }
    return res.status(400).json({ message: "Chat not found" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.editVisibility = async (req, res, next) => {
  try {
    const authUser = await Token.userAuth(req, res, next);
    const { messageId } = req.params;
    const { visibility } = req.body;
    const { rows } = await Message.getOneMessage({ message_id: messageId });
    if (!rows[0]) return res.status(400).json({ message: "Message not found" });
    if (rows[0].sender_id !== authUser.user_id && visibility === "none")
      return res
        .status(400)
        .json({ message: "Can't delete other users' messages" });
    await Message.editVisibility({
      message_id: messageId,
      sender_id: authUser.user_id,
      visibility,
    });
    return res.status(200).json({ message: "Visibility changed" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
