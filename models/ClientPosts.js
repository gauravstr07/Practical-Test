const mongoose = require("mongoose");

const clientPosts = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("clientPosts", clientPosts);
