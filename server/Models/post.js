const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    text: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
})

const postSchema = mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [commentSchema],
  content: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const postModel = mongoose.model('Post', postSchema);
const commentModel = mongoose.model('Comment', commentSchema)

module.exports = {
    Post: postModel,
    Comment: commentModel
};