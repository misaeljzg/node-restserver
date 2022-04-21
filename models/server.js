const express = require('express')
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Middlewares
        this.middlewares();
        //App routes
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Reading and parsing request body
        this.app.use(express.json());

        //Public folder
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/users'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on', this.port);
        });
    }
}

module.exports = Server;