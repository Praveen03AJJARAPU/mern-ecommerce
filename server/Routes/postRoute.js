const { createPost, getPosts, likePost, commentPost, getComments, getProfile } = require("../Controllers/postController");
const { userVerification } = require("../Middleware/authMiddleware");
const router = require("express").Router();
const upload = require('./multer')

  router.post("/create", upload.array("images", 15), createPost);
  router.post("/like", likePost);
  router.post("/comment", commentPost);
  
  router.get("/get", getPosts);
  router.get("/comment/:id", getComments);
  router.get('/profile/:id', getProfile);

  module.exports = router;

