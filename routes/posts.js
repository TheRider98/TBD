const express = require("express");
var app = express();
const router = express.Router();
const Post = require("../models/Post");
const { validatePostInput } = require("../util/post_valid");
const jwtCheck = require("../util/check-auth");

// get all posts
router.get("/get", async (req, res) => {
  try {
    const postMessages = await Post.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// create posts
router.post("/create", async (req, res) => {
  let { title, description, price, location, contact, createdBy , image } = req.body;
  const { valid, errors } = validatePostInput(title, description, price);

  const post = new Post({
    title: title,
    description: description,
    price: price,
    location: location,
    contact: contact,
    createdBy: createdBy,
    image: image,
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ msg: "Cannot find post" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
  res.user = post;
  next();
}
// delete posts
router.delete("/del/:id", getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;