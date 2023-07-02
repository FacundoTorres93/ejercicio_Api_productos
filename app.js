const { json } = require('body-parser');
const express = require('express');
const { read } = require('fs');
const app = express();

const routeProductos = require('./routes/productos');
const erroHandler = require('./middlewares/errorHandler');

app.use(express.json());

app.use('/productos', routeProductos);

app.use(erroHandler);

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor Express.js en funcionamiento en el puerto ${port}`);
});