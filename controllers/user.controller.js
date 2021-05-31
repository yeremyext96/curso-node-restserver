const { response, request } = require('express')
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validarCampos } = require('../middlewares/validar-campos');


const usuariosGet = (req, res = response) => {
    const { nombre, correo, password, rol } = req.query;
    res.json({
        message: 'GET API - Controlador',
        nombre
    });
}

const usuariosPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    //verificar si el correo existe
    //funcion que se encuentra en los helpers, llamada en el las routes 

    //encriptar password , hacer hash
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en BD

    await usuario.save();

    //devolver Respuesta
    res.json({
        message: 'Usuario Registrado :)',
        usuario,
        
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra BD
    if (password) {
        //encriptar password , hacer hash
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    res.json({
        message: 'Usuario Actualizado :)',
        usuario
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        message: 'DELETE API - Controlador'
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        message: 'PATCH API - Controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}