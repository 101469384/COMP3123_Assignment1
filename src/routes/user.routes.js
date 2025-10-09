const router = require('express').Router();
const { signup, login } = require('../controllers/user.controller');
const { signupRules, loginRules } = require('../validators/user.validators');
const validate = require('../middlewares/validate');

router.post('/signup', signupRules, validate, signup);
router.post('/login',  loginRules,  validate, login);

module.exports = router;
