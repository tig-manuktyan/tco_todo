const User = require("./../../../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Uncorrect request", errors });
    }
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res
        .status(400)
        .json({ success: false, error: "email is already taken" });
    }
    const hashPassword = await bcrypt.hash(password, 8);
    const user = new User({ email, password: hashPassword });
    await user.save();
    return res.json({ success: true });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "1h",
    });
    return res.json({
      success: true,
      token,
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
};
