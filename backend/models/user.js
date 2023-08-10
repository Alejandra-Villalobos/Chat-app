const { pool } = require("../utils/db");

module.exports.register = ({ email, name, password }) => {
  const bindings = [email, name, password];
  const SQL_INSERT_USER = `INSERT INTO USERS(EMAIL, NAME, PASSWORD)
                              VALUES($1, $2, $3)`;
  return pool.query(SQL_INSERT_USER, bindings);
};

module.exports.login = ({ email }) => {
  const bindings = [email];
  const SQL_SELECT_USER = `SELECT 
                            USER_ID, EMAIL, NAME, PASSWORD
                            FROM USERS
                            WHERE EMAIL = $1`;
  return pool.query(SQL_SELECT_USER, bindings);
};

module.exports.findAll = () => {
  const SQL_SELECT_USERS = `SELECT 
                            USER_ID, EMAIL, NAME
                            FROM USERS`;
  return pool.query(SQL_SELECT_USERS);
};

module.exports.findOneByEmail = ({ email }) => {
  const bindings = [email];
  const SQL_SELECT_USER = `SELECT 
                                USER_ID, EMAIL, NAME
                              FROM USERS
                              WHERE EMAIL = $1`;
  return pool.query(SQL_SELECT_USER, bindings);
};

module.exports.findOneById = ({ id }) => {
  const bindings = [id];
  const SQL_SELECT_USER = `SELECT 
                                USER_ID, EMAIL, NAME
                              FROM USERS
                              WHERE USER_ID = $1`;
  return pool.query(SQL_SELECT_USER, bindings);
};