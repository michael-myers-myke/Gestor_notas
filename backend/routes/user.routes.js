const express = require('express');
const router = express.Router();

const {
    crearUsuarios,
    listarUsuarios,
    actualizarUsuario
} = require('../models/registro');


//Enrutadores para llamarlos desde postman o la API
router.post('/crearUsuario', crearUsuarios);
router.get('/listarUsuarios/:id', listarUsuarios);
router.put('/actualizarUsuario/:id', actualizarUsuario);


module.exports = {
    router
}