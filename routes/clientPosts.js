const router = require("express").Router();

const Client = require("../models/Client");
const ClientPosts = require("../models/ClientPosts");

//  CREATE NEW POST ---> http://localhost:5000/api/clientPost/createPost
router.post("/createPost", async (req, res) => {
  const newPost = new ClientPosts(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE POST ---> http://localhost:5000/api/clientPost/6391d75d867626261842b385
router.put("/:id", async (req, res) => {
  try {
    const post = await ClientPosts.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatePost = await ClientPosts.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(202).json(updatePost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(422).json("You can update only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE POST ---> http://localhost:5000/api/clientPost/6391d75d867626261842b385
router.put("/:id", async (req, res) => {
  try {
    const post = await ClientPosts.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete("Post has been deleted");
        res.status(202).json(updatePost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(422).json("You can delete only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET POST ---> http://localhost:5000/api/client/6391c8c574a237a7e2c5d0f5
router.get("/:id", async (req, res) => {
  try {
    const post = await ClientPosts.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
