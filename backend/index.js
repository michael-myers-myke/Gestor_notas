//En este archivo de indexJS es muy importante ya que aqui es donde se crea el servidor de la API basicamente
const express = require('express');
const cors = require('cors');
const pool = require('./db/conection');

const { router } = require ('./routes/user.routes');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({})) //Aqui es donde se usaran los endpoints para conectarlos con el front usando react

app.use(express.json());

app.use('/api', router);


app.get('/', (req, res) => {
    res.send('API funcionando');
});

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto:${PORT}`);
});

