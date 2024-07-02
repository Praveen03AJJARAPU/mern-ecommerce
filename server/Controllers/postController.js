const Post = require('../Models/post');
const router = require('express').Router();
const {userVerification} = require('../Middleware/authMiddleware.js')

router.post('/create', userVerification, async(req, res) => {
    try {
        // const {} = req.body;
    } catch(err) {
        res.status(400).json({message: err});
        console.log(err);
    }
})
