const db = require('../../db/conection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


exports.Login = async (req, res) => {
    const {email,password} = req.body;

    try {
        const result = await db.query(
            "SELECT * FROM usuarios WHERE email = $1", [email]
        );

        if(result.rows.length === 0){
            return res.status(500).json({msg: "El usuario no existe"})
        }

        const usuario = result.rows[0];

        const validarPassword = await bcrypt.compare(password, usuario.password);

        if(!validarPassword){
            return res.status(401).json({msg: "Contraseña incorrecta"});
        }
        
        const token = jwt.sign(
            {id: usuario.id, email: usuario.email},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN || '1h'}
        );

        res.json({msg: "Autenticado - Bienvenido", token});
    } catch (error) {
        res.status(500).json({msg: "Error al iniciar sesion", error: error.message});
    }
};