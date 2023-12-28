const { pool } = require("../utils/db");

module.exports.insertCode = ({ email, code }) => {
    const bindings = [email, code];
    const SQL_GET_CODE = `INSERT INTO VERIFICATION(EMAIL, CODE)
                                  VALUES($1, $2)`;
    return pool.query(SQL_GET_CODE, bindings);
  };

module.exports.verifyCode = ({ email }) => {
  const bindings = [email];
  const SQL_GET_CODE = `SELECT EMAIL, CODE, ACTIVE, ACCOUNT_STATUS
                                FROM VERIFICATION
                                WHERE EMAIL = $1
                                ORDER BY TIMESTAMP DESC
                                LIMIT 1`;
  return pool.query(SQL_GET_CODE, bindings);
};

module.exports.activateAccount = ({ email }) => {
  const bindings = [email];
  const SQL_DEACTIVATE_CODE = `UPDATE VERIFICATION 
                                SET ACCOUNT_STATUS = TRUE
                                WHERE EMAIL = $1 AND ACCOUNT_STATUS = FALSE`;
  return pool.query(SQL_DEACTIVATE_CODE, bindings);
};

module.exports.deactivateCode = ({ email }) => {
    const bindings = [email];
    const SQL_DEACTIVATE_CODE = `UPDATE VERIFICATION 
                                  SET ACTIVE = FALSE
                                  WHERE EMAIL = $1 AND ACTIVE = TRUE`;
    return pool.query(SQL_DEACTIVATE_CODE, bindings);
  };