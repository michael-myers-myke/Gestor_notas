const express = require('express');
const router = express.Router();


const {
    crearTarea,
    listarTarea,
    actualizarTarea
} = require('../models/tareas');


router.post('/crearTarea', crearTarea);
router.get('/listarTarea', listarTarea);
router.put('/actualizarTarea', actualizarTarea);


module.exports = {
    router
}