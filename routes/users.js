const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');
const { usersGet, 
    usersPut, 
    usersPost, 
    usersDelete, 
    usersPatch } = require('../controllers/users');
const validateFields = require('../middlewares/validate-fields');

const router = Router();

const isRoleValid = async (role = '') => {
    const roleExists = await Role.findOne({role});
    if(!roleExists) {
        throw new Error(`The role ${role} is not register in DB`)
    }
};

router.get('/', usersGet);

router.put('/:id', usersPut);

router.post('/', [
    check('name', 'Name cannot be empty').not().isEmpty(),
    check('password', 'Password must be longer than 6 characters').isLength({min: 6}),
    check('mail', 'Mail is not valid').isEmail(),
    //check('role', 'Not a valid role').isIn('ADMIN_ROLE', 'USER_ROLE'),
    check('role').custom(isRoleValid), 
    validateFields
], usersPost);

router.delete('/', usersDelete);

router.patch('/', usersPatch);

module.exports = router;