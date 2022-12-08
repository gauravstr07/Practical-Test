const router = require("express").Router();

const Client = require("../models/Client");
const ClientPosts = require("../models/ClientPosts");

// UPDATE CLIENT USER ---> http://localhost:5000/api/client/6391c8c574a237a7e2c5d0f5
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const updateUser = await Client.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(202).json(updateUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("You can update only your account");
  }
});

// DELETE CLIENT USER ---> http://localhost:5000/api/client/6391c8c574a237a7e2c5d0f5
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await Client.findById(req.params.id);
      try {
        await ClientPosts.deleteMany({ username: user.username });
        await Client.findByIdAndDelete(req.params.id);
        res.status(202).json("User Deleted Successfully..!");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account");
  }
});

// GET CLIENT USER ---> http://localhost:5000/api/client/6391c8c574a237a7e2c5d0f5
router.get("/:id", async (req, res) => {
  try {
    const user = await Client.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
