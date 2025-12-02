//En este archivo de indexJS es muy importante ya que aqui es donde se crea el servidor de la API basicamente
const express = require('express');
const cors = require('cors');
const pool = require('./db/conection');

const { router: user} = require ('./routes/user.routes');
const {router: materias} = require ('./routes/materias.routes');
const {router: tareas} = require('./routes/tareas.routes');
const {router: login} = require('./auth/routes/auth.routes');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({})) //Aqui es donde se usaran los endpoints para conectarlos con el front usando react

app.use(express.json());

app.use('/api', user);
app.use('/api', materias);
app.use('/api', tareas);
app.use('/api', login);


app.get('/', (req, res) => {
    res.send('API funcionando');
});

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto:${PORT}`);
});

