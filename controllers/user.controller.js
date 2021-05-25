const { response, request } = require('express')

const usuariosGet = (req, res = response) => {
    const { nombre } = req.query;
    res.json({
        message: 'GET API - Controlador',
        nombre
    });
}

const usuariosPost = (req = request, res = response) => {
    
    res.json({
        message: 'POST API - Controlador',
        
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        message: 'PUT API - Controlador',
        id
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