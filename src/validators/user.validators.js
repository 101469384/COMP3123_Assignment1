const { body } = require('express-validator');

const signupRules = [
    body('username').trim().notEmpty().withMessage('username is required'),
    body('email').isEmail().withMessage('valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('password min length 6')
];

const loginRules = [
    body('password').notEmpty().withMessage('password is required'),
    body().custom(b => {
        if (!b.email && !b.username) throw new Error('email or username is required');
        return true;
    })
];

module.exports = { signupRules, loginRules };
