//const {<nombre de las funciones a importar separadas por coma>} = require('<fuente>');
//importar la funcion getconnection de la carpeta db:
const {getConnection} = require('./databases/configuration');

//importar express para crear la app a partir de una instancia de express
const express = require('express');

//importar cors para para que el front pueda acceder al back desde un servidor distinto
const cors = require('cors');

//importar dotenv para las variables de entorno
require('dotenv').config();

//ejecutar la funcion de conección a la base de datos:
getConnection();

//crear la app a partir de express:
const app = express();

//puerto (que sea puerto en el archivo .env en el string PORT, y en caso de no estar definido, usar el 8080 por defecto)
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use('/api/etapa-proyecto', require('./router/etapaProyecto'))
app.use('/api/tipo-proyecto', require('./router/tipoProyecto'));
app.use('/api/universidad', require('./router/universidad'))
app.use('/api/proyecto', require('./router/proyecto'))
app.use('/api/cliente', require('./router/cliente'))

app.listen(port, () => {
    console.log(`arrancó por puerto: ${port}`)
})