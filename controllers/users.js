const { response } = require('express');

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

const usersPost = (req, res) => {

    const {name, age} = req.body;

    res.json({
        msg:'post API - controller',
        name,
        age
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