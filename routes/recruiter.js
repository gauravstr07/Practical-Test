const router = require("express").Router();

const Recruiter = require("../models/Recruiter");
const ClientPosts = require("../models/ClientPosts");

const bcrypt = require("bcryptjs");

// UPDATE USER ---> http://localhost:5000/api/recruiter/63919280f5780da7d3f45324
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(422).json(error);
      }
    }
    try {
      const recruiter = await Recruiter.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(recruiter);
    } catch (error) {
      return res.status(422).json(error);
    }
  } else {
    return res.status(403).json({
      message: "You can update only your account!",
    });
  }
});

// DELETE USER ---> http://localhost:5000/api/recruiter/63919280f5780da7d3f45324
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await Recruiter.findByIdAndDelete(req.params.id);
      res.status(202).json({
        message: "Accound has been deleted successfully",
      });
    } catch (error) {
      return res.status(422).json(error);
    }
  } else {
    return res.status(403).json({
      message: "You can delete only your account!",
    });
  }
});

// GET USER ---> http://localhost:5000/api/recruiter/6391b05e7cc4c0bde8c206a3
router.get("/:id", async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id);
    const assignJob = await ClientPosts.find({ jobTitle: recruiter.jobTitle });
    res.status(200).json({ recruiter, assignJob });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
