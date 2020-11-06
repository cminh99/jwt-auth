const router = require('express').Router();
const { postLogin, postRegister } = require('../controllers/auth.controller');

router.post('/login', postLogin);
router.post('/register', postRegister);

module.exports = router;
