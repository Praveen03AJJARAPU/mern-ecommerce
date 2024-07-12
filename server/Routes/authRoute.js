const { signUp, Login } = require("../Controllers/authController");
const { userVerification } = require("../Middleware/authMiddleware");
const router = require('express').Router();
const upload = require('./multer')

router.post('/signUp',upload.single("image"), signUp);
router.post('/login', Login); 
router.post('/', userVerification);


module.exports = router;