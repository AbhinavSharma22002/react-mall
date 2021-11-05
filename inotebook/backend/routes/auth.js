const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const JWT_secret = "abhinavisagood$body";
const fetchUser = require("../middleware/Fetchuser");

// Route 1:  Create a user using : Post "api/auth/createUser". Doesn't require Auth
router.post(
  "/createUser",
  [
    body("name", "Enter valid Name").isLength({ min: 5 }),
    body("email", "Enter valid Email").isEmail(),
    body("password", "Enter valid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If there are errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }

    const { email, password, name } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user !== null) {
        return res.status(400).json({ error: "please try some other email" });
      }

      let salt = await bcrypt.genSalt(saltRounds);
      let hash = await bcrypt.hash(password, salt);

      user = await User.create({
        name: name,
        password: hash,
        email: email
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authData = await jwt.sign(data, JWT_secret);

      return res.json({ authData });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);



//Route 2:  Login a user using : Post "api/auth/createUser". Doesn't require Auth
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").exists(),
  ],
  async (req, res) => {
    //If there are errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credintials" });
      }

      let passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credintials" });
      }

      let data = {
        user: {
          id: user.id,
        },
      };
      const authData = await jwt.sign(data, JWT_secret);
      return res.json({ authData });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//Route 3:  Get loggedin user details using: post "/api/auth/getuser". login required

router.post(
  "/getuser",fetchUser,
  async (req, res) => {
    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
