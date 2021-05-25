const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { json, urlencoded } = require('express');


class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //middlewares
        this.middlewares();


        //Rutas de la appicacion
        this.routes();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Morgan
        this.app.use(morgan("dev"));

        //lectura y parseo del json
        this.app.use(express.json())
        //this.app.use(urlencoded({ extended: false }));

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });

    }

}

module.exports = Server;

