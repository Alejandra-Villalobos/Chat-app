const { pool } = require("../utils/db");

module.exports.create = ({ first_user_id, second_user_id }) => {
  const bindings = [first_user_id, second_user_id];
  const SQL_INSERT_CHAT = `INSERT INTO CHAT(first_user_id, second_user_id)
                              VALUES($1, $2)`;
  return pool.query(SQL_INSERT_CHAT, bindings);
};