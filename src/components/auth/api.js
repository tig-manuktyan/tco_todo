const express = require("express");
const authCtr = require("./service");
const { check } = require("express-validator");

const authRouter = express.Router();

authRouter.post(
  "/register",
  [
    check("email", "Uncorrect email").isEmail(),
    check(
      "password",
      "Password must be longer than 3 and shorter than 12"
    ).isLength({ min: 3, max: 12 }),
  ],
  authCtr.createUser
);
authRouter.post("/login", authCtr.login);

module.exports = authRouter;
