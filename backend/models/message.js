const { pool } = require("../utils/db");

module.exports.create = ({ sender_id, chat_id, content }) => {
  const bindings = [sender_id, chat_id, content];
  const SQL_INSERT_MESSAGE = `INSERT INTO MESSAGE(sender_id, chat_id, content)
                              VALUES($1, $2, $3)`;
  return pool.query(SQL_INSERT_MESSAGE, bindings);
};
