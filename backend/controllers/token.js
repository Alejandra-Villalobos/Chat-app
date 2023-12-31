const Token = require("../models/token");

module.exports.userAuth = async (req, res, next) => {
  try {
    const header_authorization = req.get("Authorization");
    if (!header_authorization) throw new Error("Authorization needed"); //No hay token
    const token = header_authorization.split(" ")[1];
    const verify = await Token.validate({ content: token });
    if(!verify.rows[0].active) throw new Error("Session expired"); //Token expirado
    const { rows } = await Token.findUser({ content: token });
    if (rows[0]) {
      return rows[0];
    }
    throw new Error("Authorization failed"); //Token inválido
  } catch (error) {
    console.log(error)
  }
};
