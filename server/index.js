const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const mongoURL = process.env.MONGO_URL;

app.listen(process.env.PORT || 5000, console.log('running'))

mongoose.connect(mongoURL)
.then(() => console.log('connected'))
.catch((err) => console.log(err))
