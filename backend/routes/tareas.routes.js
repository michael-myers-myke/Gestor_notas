const express = require('express');
const router = express.Router();


const {
    crearTarea,
    listarTarea,
    actualizarTarea
} = require('../models/tareas');


router.post('/crearTarea/:id_materia', crearTarea);
router.get('/listarTarea/:id', listarTarea);
router.put('/actualizarTarea/:id', actualizarTarea);


module.exports = {
    router
}