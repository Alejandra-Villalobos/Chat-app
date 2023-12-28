const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Verification = require("../models/verification");

module.exports.deactivateCode = async (req, res, next) => {
  const { email } = req.body;
  try {
    await Verification.deactivateCode({ email });
    res.status(200).json({ message: "Code inactive" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.verifyCode = async (req, res, next) => {
  const { email, code } = req.body;
  if (!code) return res.status(400).json({ message: "Enter a code" });
  try {
    const { rows } = await Verification.verifyCode({ email });
    if (!rows[0]) return res.status(400).json({ message: "Email not found" });
    const { code: code_hash, active } = rows[0];
    if (active) {
      const code_is_valid = await bcryptjs.compare(code, code_hash);
      if (code_is_valid) {
        await Verification.deactivateCode({ email });
        await Verification.activateAccount({ email });
        return res.status(200).json({ message: "Code accepted!" });
      }
      return res.status(400).json({ message: "Wrong code" });
    }
    res.status(400).json({ message: "Code expired, request another one" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.verifyAccountStatus = async (req, res, next) => {
  const { email } = req.body;
  try {
    const { rows } = await Verification.verifyCode({ email });
    if (!rows[0]) return res.status(400).json({ message: "Email not found" });
    const { account_status } = rows[0];
    if (account_status) return res.status(200).json({ message: "Account activated" });
    res.status(400).json({ message: "You need to verify your account before registering" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
