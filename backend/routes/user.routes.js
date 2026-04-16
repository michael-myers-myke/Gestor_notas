const express = require('express');
const router = express.Router();

const {
    crearUsuarios,
    listarUsuarios,
    actualizarUsuario
} = require('../models/registro');

const {verificarToken, Propietario} = require('../auth/middlewares/auth.middlewares')


//Enrutadores para llamarlos desde postman o la API
router.post('/crearUsuario', crearUsuarios);
router.get('/listarUsuarios/:id_usuario', verificarToken, Propietario, listarUsuarios);
router.put('/actualizarUsuario/:id_usuario', verificarToken, Propietario, actualizarUsuario);


module.exports = {
    router
}