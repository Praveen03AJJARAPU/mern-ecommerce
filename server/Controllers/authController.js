const User = require('../Models/userModel');
const {createSectretToken} = require('../utils/SecretToken');
const bcrypt = require('bcrypt');

module.exports.signUp = async(req, res, next) => {
    try {
        const {email, password, username } = req.body;
        const image = req.file.filename;
        const exUser = await User.findOne({email});
        if(exUser) {
            return res.json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          username,
          email,
          password: hashedPassword,
          image,
        });
        const token = createSectretToken(user._id);
        res.cookie('token', token, {
            withCredentials: true,
            httpOnly: false,
        })
        res
          .status(201)
          .json({
            message: "User signed in successfully",
            success: true,
            user,
          });
    } catch(err) {
        res.json({error: err});
    }
}

module.exports.Login = async(req, res, next) => {
    try {
      const { email, password } = req.body;
      const logUser = await User.findOne({email});
      if(!logUser) {
        return res.json({message: 'Invalid user or password'});
      }
      const pas = bcrypt.compare(password, logUser.password);
      if(!pas) return res.status({message: 'Incorrect'});
      const token = createSectretToken(logUser._id);
      res.cookie('token', token, {
        withCredentials: true,
        httpOnly: false,
      })
      res.status(201).json({message: 'user logged in', logUser, success: true,})
     
    } catch(err) {
        console.log(err);
    }
}