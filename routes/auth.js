const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const validateFields = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
    check('mail', 'mail is needed').isEmail(),
    check('password', 'Password is needed').not().isEmpty(),
    validateFields
] ,login);

router.post('/google', [
    check('id_token', 'id_token is needed').not().isEmpty(),
    validateFields
] ,googleSignIn);

module.exports = router;