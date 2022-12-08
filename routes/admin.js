const router = require("express").Router();

const Recruiter = require("../models/Recruiter");

const bcrypt = require("bcryptjs");

// REGISTER AUTH ----> http://localhost:5000/api/admin/register
router.post("/register", async (req, res) => {
  try {
    // Generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newRecruiter = await new Recruiter({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //User and return response
    const recruiter = await newRecruiter.save();
    res.status(201).json(recruiter);
  } catch (error) {
    console.log(error);
    res.status(422).send(error);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const recruiter = await Recruiter.findOne({
      email: req.body.email,
    });
    !recruiter && res.status(404).send("Recruiter not found!");

    const validPassword = await bcrypt.compare(
      req.body.password,
      recruiter.password
    );
    !validPassword && res.status(400).json({ message: "Wrong password!" });

    res.status(201).json(recruiter);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
