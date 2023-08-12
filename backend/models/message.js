const { pool } = require("../utils/db");

module.exports.create = ({ sender_id, chat_id, content }) => {
  const bindings = [sender_id, chat_id, content];
  const SQL_INSERT_MESSAGE = `INSERT INTO MESSAGE(sender_id, chat_id, content)
                              VALUES($1, $2, $3)`;
  return pool.query(SQL_INSERT_MESSAGE, bindings);
};

module.exports.getAll = ({ chat_id }) => {
  const bindings = [chat_id];
  const SQL_GET_MESSAGE = `SELECT m.sender_id, u.name, m.chat_id, m.content, m.timestamp
                              FROM MESSAGE m
                              JOIN USERS u ON u.user_id=m.sender_id
                              WHERE m.chat_id=$1`;
  return pool.query(SQL_GET_MESSAGE, bindings);
};
