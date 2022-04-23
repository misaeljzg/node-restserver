const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, 
    usersPut, 
    usersPost, 
    usersDelete, 
    usersPatch } = require('../controllers/users');
const { isRoleValid, mailExists, userByIdExists } = require('../helpers/db-validators');
const validateFields = require('../middlewares/validate-fields');

const router = Router();

router.get('/', usersGet);

router.put('/:id', [
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(userByIdExists),
    check('role').custom(isRoleValid),
    validateFields
], usersPut);

router.post('/', [
    check('name', 'Name cannot be empty').not().isEmpty(),
    check('password', 'Password must be longer than 6 characters').isLength({min: 6}),
    check('mail', 'Mail is not valid').isEmail(),
    check('mail').custom(mailExists),
    //check('role', 'Not a valid role').isIn('ADMIN_ROLE', 'USER_ROLE'),
    check('role').custom(isRoleValid), 
    validateFields
], usersPost);

router.delete('/', usersDelete);

router.patch('/', usersPatch);

module.exports = router;