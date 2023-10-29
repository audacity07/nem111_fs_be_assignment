const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../model/blacklist.model");

const userRouter = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               pass:
 *                 type: string
 *               city:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: New user registered
 *       400:
 *         description: Registration failed
 */
userRouter.post("/register", async (req, res) => {
  const { username, email, pass, city, age } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ msg: `This email has already been registered.` });
    }

    if (!testPassword(pass)) {
      return res.status(400).json({
        msg: `Password doesn't follow required conditions. Change it.`,
      });
    }

    const hash = await bcrypt.hash(pass, 5);
    const newUser = new UserModel({
      username,
      email,
      pass: hash,
      city,
      age: Number(age),
    });
    await newUser.save();
    res.status(200).json({
      msg: "The new user has been registered",
      registeredUser: { username, email, city, age: Number(age) },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in with user credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               pass:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in
 *       400:
 *         description: Login failed
 */
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: `User not registered` });
    }

    const isPasswordValid = await bcrypt.compare(pass, user.pass);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: `Password is wrong` });
    }

    // add username and user ID as the payload and
    // secret key can be anything and we are adding
    // "masai" for now.
    const token = jwt.sign(
      { username: user.username, userID: user._id },
      "masai",
      {
        expiresIn: 300,
      }
    );
    const refreshToken = jwt.sign(
      { username: user.username, userID: user._id },
      "masai",
      {
        expiresIn: "7d",
      }
    );
    res.status(200).json({ msg: `Logged In`, token, refreshToken });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

/**
 * @swagger
 * /user/logout:
 *   get:
 *     summary: Log out a user
 *     responses:
 *       200:
 *         description: User logged out
 *       400:
 *         description: Logout failed
 */
userRouter.get("/logout", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    let val = new BlackListModel({ token });
    await val.save();
    res.status(200).json({ msg: "User has been logged out" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

function testPassword(pass) {
  let num = false;
  let uppercase = false;
  let specialChar = false;
  let len = false;

  if (pass.length >= 8) {
    len = true;
  }

  for (let val of pass) {
    if (val >= "A" && val <= "Z") {
      uppercase = true;
    }
    if (val >= 0 && val <= 9) {
      num = true;
    }
    if (val === "@" || val === "#" || val === "$") {
      specialChar = true;
    }
  }
  if (num && uppercase && specialChar && len) {
    return true;
  } else {
    return false;
  }
}

module.exports = { userRouter };
