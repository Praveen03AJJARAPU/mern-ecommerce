const { signUp, Login } = require("../Controllers/authController");
const { userVerification } = require("../Middleware/authMiddleware");
const router = require('express').Router();

router.post('/signUp', signUp);
router.post('/login', Login);
router.post('/', userVerification);

module.exports = router;