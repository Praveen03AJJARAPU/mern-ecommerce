const {Post, Comment} = require('../Models/post.js');
const User = require('../Models/userModel');
// const {userVerification} = require('../Middleware/authMiddleware.js')
// const { model } = require('mongoose');
// const { populate } = require('dotenv');

module.exports.createPost = async(req, res) => {
    const username =  req.body.username;
    console.log(username)
    try {
      const newPost = new Post({
        username,
        content: req.body?.content,
        images: await req.files?.map(file => file.filename),
      }); 
      const savePost = await newPost.save();
      await User.findOne({_id: username})
      .then(async(exUser) => {
        if(exUser) {
            exUser.posts.push(newPost);
            await exUser.save();
        }
      })
      res.status(201).json(savePost);
    } catch (err) {
      res.status(400).json({ message: err });
      console.log(err);
    } 
}

module.exports.deletePost = async(req,res) => {

}

module.exports.getPosts = async(req,res) => {
  try {
    const posts = await Post.find().populate('username');
    res.status(200).json(posts)
  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
}

module.exports.updatePosts = async(req,res) => {

}

module.exports.likePost = async(req,res) => {
  try {
    const {_id, user} = req.body;
    const gPost = await Post.findOne({_id});
    if(!gPost) {
      res.status(400).json({err:'no post found'})
    }
    if (gPost.likes.includes(user)) {
      gPost.likes.pop(user);
      await gPost.save();
      return res.status(200).json({ status: false });
    } else {
      gPost.likes.push(user);
      await gPost.save();
      return res.status(200).json({status: true, likedBy: gPost.likes});
    }

  } catch(error) {
    res.status(400).json(error);
  }
}

module.exports.commentPost = async(req, res) => {
  try {
    const { _id, userID, text } = req.body;

    const gPost = await Post.findOne({ _id });
    if (!gPost) res.status(400).json({ error: "Post not found" });

    const newComment = new Comment({
      username: userID,
      text,
    });
    await newComment.save();
    gPost.comments.push(newComment);
    await gPost.save();
    res.status(200).json({ msg: "Success" });
  } catch (error) {
    res.status(400).json({message: error});
  }
}

module.exports.getComments = async(req, res) => {
  try {
    const {id} = req.params;
    const post = await Post.findById(id)
    .populate({
      path: 'comments',
      populate: {
        path: 'username',
        model: 'User',
      }
    }).exec()
      
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post.comments); 
  } catch(err) {
    res.status(400).json(err);
  }
}

module.exports.deleteComment = async(req, res) => {
  
}

module.exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};