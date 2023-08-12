const { pool } = require("../utils/db");

module.exports.create = ({ first_user_id, second_user_id }) => {
  const bindings = [first_user_id, second_user_id];
  const SQL_INSERT_CHAT = `INSERT INTO CHAT(first_user_id, second_user_id)
                              VALUES($1, $2)`;
  return pool.query(SQL_INSERT_CHAT, bindings);
};

module.exports.exists = ({ first_user_id, second_user_id }) => {
  const bindings = [first_user_id, second_user_id];
  const SQL_SELECT_CHAT = `SELECT first_user_id, second_user_id
                              FROM CHAT
                              WHERE first_user_id=$1 AND second_user_id=$2`;
  return pool.query(SQL_SELECT_CHAT, bindings);
};

module.exports.existsWithId = ({ chat_id }) => {
  const bindings = [chat_id];
  const SQL_SELECT_CHAT = `SELECT chat_id
                              FROM CHAT
                              WHERE chat_id=$1`;
  return pool.query(SQL_SELECT_CHAT, bindings);
};

module.exports.userExists = ({ chat_id, user_id }) => {
  const bindings = [chat_id, user_id];
  const SQL_SELECT_CHAT = `SELECT chat_id
                              FROM CHAT
                              WHERE chat_id=$1 AND (first_user_id=$2 OR second_user_id=$2)`;
  return pool.query(SQL_SELECT_CHAT, bindings);
};

module.exports.getAllWithName = ({ user_id }) => {
  const bindings = [user_id];
  const SQL_SELECT_CHAT = `SELECT C.chat_id, u1."user_id" AS first_user_id, u1."name" AS first_user_name, u1.email AS first_user_email, 
                            u2."user_id" AS second_user_id, u2."name" AS second_user_name, u2.email AS second_user_email 
                          FROM CHAT c
                          JOIN USERS u1 ON u1.user_id=c.first_user_id 
                          JOIN USERS u2 ON u2.user_id=c.second_user_id
                          WHERE (first_user_id=$1 OR second_user_id=$1)`;
  return pool.query(SQL_SELECT_CHAT, bindings);
};