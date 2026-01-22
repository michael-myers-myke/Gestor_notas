const db = require('../db/conection');

exports.crearTarea = async (req, res) => {
    
    const {id_materia} = req.params;
    const {nombre_tarea, fecha_creacion, estado} = req.body;

    try {
        const result = await db.query(
            "INSERT INTO tareas (nombre_tarea, fecha_creacion, estado, id_materia) VALUES ($1, $2, $3, $4) RETURNING *",
            [nombre_tarea, fecha_creacion, estado, id_materia]
        )

        res.status(201).json({msg: "Tarea creada correctamente: ", tarea: result.rows[0]});
    } catch (error) {
        res.status(500).json({msg: "Hubo un problema al crear la tarea: ", error: error.message});
    }
};


exports.listarTarea = async (req, res) => {
    const {id_usuario} = req.params;

    try {
        const result = await db.query(
            "select t.* from tareas t join materias m on t.id_materia = m.id where m.id_usuario =$1", 
            [id_usuario]
        );

        res.status(200).json({msg: "Las tareas son: ", tareas: result.rows});
    } catch (error) {
        res.status(500).json({msg: "Hubo un problema al listar las tareas: ", error: error.message});
    }
};


exports.actualizarTarea = async (req, res) => {
    const {id} = req.params;
    const {nombre_tarea, estado} = req.body;

    try {
        const result = await db.query(
            "UPDATE tareas SET nombre_tarea = $1, estado = $2 WHERE id = $3 RETURNING *",
            [nombre_tarea, estado, id]
        );

        res.status(200).json({msg: "Tarea actualizada correctamente: ", tarea: result.rows[0]});
    } catch (error) {
        res.status(500).json({msg: "Hubo un error al actualizar la tarea: ", error: error.message});
    }
}