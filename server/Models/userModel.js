const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    image: {type: String, required: true},
    posts: [{type: mongoose.Schema.Types.ObjectId}]
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;