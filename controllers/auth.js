const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/generate-jwt');
const User = require('../models/user');
const login = async (req, res = response) => {

    const { mail, password } = req.body;

    try {

        //Verify if mail exists
        const user = await User.findOne({mail});
        if(!user){
            return res.status(400).json({
                msg: 'User / Password incorrect - mail'
            });
        }

        //User is still active
        if(!user.status){
            return res.status(400).json({
                msg: 'User / Password incorrect - status: false'
            });
        }

        //Verify Password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: 'User / Password incorrect - password'
            });
        }

        //Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Reach your administrator'
        })
    }


}

module.exports = {
    login
}