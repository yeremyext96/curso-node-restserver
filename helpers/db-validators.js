const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    //console.log(existeEmail);
    if (existeEmail) {
        throw new Error(`el correro ${correo} Ya esta registrado en la BD`);
    }
}

const existeUsuarioPorId = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);
    //console.log(existeEmail);
    if (!existeUsuario) {
        throw new Error(`el id ${id} no esta registrado en la BD`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}
