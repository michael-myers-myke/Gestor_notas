const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config(); //Siempre debo usar el .env para que se puedan cargar los parametros del archivo .ENV si no no se van a lerr

const pool = new Pool({
    connectionString: process.env.DB_URL,
});

pool.connect()
.then(() => console.log("Conectado al db"))
.catch((error) => console.error("Error al conectar a la db: ", error));

module.exports = pool;


