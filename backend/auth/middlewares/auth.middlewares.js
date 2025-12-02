const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.verificarToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        return res.status(401).json({msg: "Token requerido"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //Toma los datos del payload que se mandan desde el controlador del login
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({msg: "Token invalido"});
    }
}

exports.Propietario = async (req, res, next) => {
    const idUsuario = Number(req.params.id);

    if(req.user.id !== idUsuario){
        return res.status(401).json({msg: "Usuario No autorizado"});
    }

    next();
};