const { Pool } = require('pg');
const dotenv = require('dotenv');

const pool = new Pool({
    conectionString: process.env.DB_URL,
});

pool.connect()
.then(() => console.log("Conectado al db"))
.catch(() => console.error("Error al conectar a la db: ", error));

module.exports = {
    pool
};


