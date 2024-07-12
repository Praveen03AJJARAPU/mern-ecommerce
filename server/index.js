const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cookie  = require('cookie-parser')
const auth = require('./Routes/authRoute')
const postRoute = require('./Routes/postRoute');
// const socketIo = require('socket.io');
const { Post, Comment } = require('./Models/post');


const app = express();
// const server = require('http').createServer(app);
// const io = socketIo(server);
const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL)
.then(() => console.log('connected'))
.catch((err) => console.log(err))

app.listen(process.env.PORT || 5000, console.log('running'))
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.static('public'));
app.use(cookie());
app.use(express.json())
app.use('/', auth);
app.use('/post', postRoute);

// io.on('connection', (socket) => {
//   console.log('user connected');

//   socket.on('diconnect', () => {
//     console.log('Disconnected')
//   })
//   socket.on('newComment', async(data) => {
//     const {_id, userID, text} = data;
//     try {
//       const gPost = await Post.findOne({_id});
//       if(!gPost) {
//         socket.emit('error', 'post not found');
//         return;
//       }
//       const newComment = new Comment({username: userID, text});

//       await newComment.save();
//       gPost.comments.push(newComment);
//       await gPost.save();
//       io.emit('commentAdded', post.comments);
//     } catch (error) {
//       socket.emit('err', error);
//     }
//   })
// })
