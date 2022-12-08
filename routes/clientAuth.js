const router = require("express").Router();

const Client = require("../models/Client");

// REGISTER A CLIENT USER
router.post("/register", async (req, res) => {
  try {
    const newUser = await new Client({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN A CLIENT USER
router.post("/login", async (req, res) => {
  try {
    const user = await Client.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
