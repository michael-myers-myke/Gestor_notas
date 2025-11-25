const express = require('express');
const router = express.Router();

const {
    crearMateria,
    listarMaterias,
    actualizarMateria
} = require('../models/materias');

router.post('/crearMateria/:id_usuario', crearMateria);
router.get('/listarMaterias/:id', listarMaterias);
router.put('/actualizarMaterias/:id', actualizarMateria);



module.exports = {
    router
}