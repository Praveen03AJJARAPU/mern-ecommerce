const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cookie  = require('cookie-parser')
const auth = require('./Routes/authRoute')

const app = express();
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
app.use(cookie());
app.use(express.json())
app.use('/', auth);
