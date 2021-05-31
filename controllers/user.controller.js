const { response, request, json } = require('express')
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validarCampos } = require('../middlewares/validar-campos');


const usuariosGet = async (req = request, res = response) => {

    //paginacion
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    //validar que reciba numeros en los params
    if (isNaN(desde) || isNaN(limite)) {
        return res.status(400).json({
            message: 'los parametros de paginacion deben ser tipo numerico'
        });
    } else {

        const [total, usuarios] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.json({
            //resp,
            total,
            usuarios
        });
    }
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

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    //Borrar fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);
    
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

    res.json({
        message: 'Usuario eliminado',
        usuario
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