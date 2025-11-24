const db = require('../db/conection');

exports.crearMateria = async (req, res) => {
    const {id_usuario} = req.params;
    const {nombre_materia, descripcion} = req.body;

    try {
        const result = await db.query(
            "INSERT INTO materias WHERE id_usuario = $1 (nombre_materia, descripcion, id_usuario) VALUES ($1, $2, $3)",
            [nombre_materia, descripcion, id_usuario]
        )

        res.status(200).json({msg: "Materia creada correctamente", materia: result.rows[0]});
    } catch (error) {
        res.status(500).json({msg: 'Hubo un problema al crear la materia', error: error.message});
    }
};


exports.listarMaterias = async (req, res) => {
    const {id_usuario} = req.params;

    try {
        const result = await db.query(
            "SELECT * FROM materias WHERE id_usuario = $1",
            [id_usuario]
        )
        
        res.status(200).json({msg: 'Las materias del usuario son: ', materias: result.rows[0]});
    } catch (error) {
        
    }
}