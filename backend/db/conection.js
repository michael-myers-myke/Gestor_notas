const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect()
.then(() => console.log("Conectado al db"))
.catch((error) => console.error("Error al conectar a la db: ", error));

module.exports = pool;