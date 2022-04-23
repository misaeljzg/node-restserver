const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = (req, res = response) => {

    const {q, name = 'noname', apikey, page = 1, limit} = req.query;

    res.json({
        msg:'get API - controller',
        q,
        name,
        apikey,
        page,
        limit
    });
}

const usersPost = async (req, res) => {

    const {name, mail, password, role} = req.body;

    const user = new User({
        name, mail, password, role
    });

    //Verify if mail exists
    const mailExists = await User.findOne({mail});

    if(mailExists) {
        return res.status(400).json({
            msg: 'Mail is already registered'
        });
    }

    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(user.password, salt);

    //Store in DB
    await user.save();

    res.json({
        msg:'post API - controller',
        user
    })
};

const usersPut = (req, res) => {

    const {id} = req.params;

    res.status(500).json({
        msg:'put API - controller',
        id
    })
};

const usersDelete = (req, res) => {
    res.json({
        msg:'delete API - controller'
    })
};

const usersPatch = (req, res) => {
    res.json({
        msg:'patch API - controller'
    })
};

module.exports = {
    usersGet,
    usersPut,
    usersDelete,
    usersPatch,
    usersPost
}