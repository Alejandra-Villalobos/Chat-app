const { pool } = require("../utils/db");

module.exports.create = ({ sender_id, chat_id, content, timestamp }) => {
  const bindings = [sender_id, chat_id, content, timestamp];
  const SQL_INSERT_MESSAGE = `INSERT INTO MESSAGE(sender_id, chat_id, content, timestamp)
                              VALUES($1, $2, $3, $4)
                              RETURNING *`;
  return pool.query(SQL_INSERT_MESSAGE, bindings);
};

module.exports.getAll = ({ chat_id }) => {
  const bindings = [chat_id];
  const SQL_GET_MESSAGE = `SELECT m.message_id, m.sender_id, u.name, m.chat_id, m.content, m.timestamp, m.visibility
                              FROM MESSAGE m
                              JOIN USERS u ON u.user_id=m.sender_id
                              WHERE m.chat_id=$1
                              ORDER BY m.timestamp ASC`;
  return pool.query(SQL_GET_MESSAGE, bindings);
};

module.exports.getOneMessage = ({ message_id }) => {
  const bindings = [message_id];
  const SQL_GET_MESSAGE = `SELECT MESSAGE_ID, SENDER_ID, CONTENT
                              FROM MESSAGE
                              WHERE MESSAGE_ID=$1`;
  return pool.query(SQL_GET_MESSAGE, bindings);
};

module.exports.editVisibility = ({ message_id, visibility }) => {
  const bindings = [message_id, visibility];
  const SQL_UPDATE_MESSAGE = `UPDATE MESSAGE
                              SET VISIBILITY=$2
                              WHERE MESSAGE_ID=$1`;
  return pool.query(SQL_UPDATE_MESSAGE, bindings);
};
