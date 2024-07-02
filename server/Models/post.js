const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    text: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

const postSchema = mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    comments: [commentSchema],
    content: {type: String},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    image: {type: String},
})

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;