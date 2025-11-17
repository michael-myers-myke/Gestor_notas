    const db = require('../db/conection');

    //Funcion para crear los usuarios
    exports.crearUsuarios = async (req, res) => {
        const {nombre, email, password} = req.body;
        try {
            const result = await db.query(
                "INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *", 
                [nombre, email, password]
            )

            res.status(201).json({msg: 'Usuario creado correctamente: ', usuario: result.rows[0] });
        } catch (error) {
            res.status(500).json({msg: 'Ocurrio un problema al crear el usuario: ', error: error.message});
        }
    };

    //Funcion para listar los usuarios
    exports.listarUsuarios = async (req, res) => {
        const {id} = req.params;
        try {
            const result = await db.query(
                "SELECT * FROM usuarios WHERE id = $1 ", [id]
            );

            res.status(200).json({msg: 'El usuario es: ', usuario: result.rows[0] });
        } catch (error) {
            res.status(500).json({msg: 'Hubo un error al listar los usuarios: ', error: error.message});
        }
    }

    //Funcion para actualizar los usuarios
    exports.actualizarUsuario = async (req, res) => {
        const {id} = req.params;
        const {nombre, email} = req.body;
        try {
            const result = await db.query(
                "UPDATE usuarios SET nombre = $1, email = $2 WHERE id = $3 RETURNING *", [nombre,email,id]
            );

            res.status(200).json({msg: 'usuario actualizado correctamente: ', usuario: result.rows[0] });
        } catch (error) {
            res.status(500).json({msg: 'Ha ocurrido un error: ', error: error.message});
        }
    }