const express = require('express');
const route = express.Router();

// Datos de ejemplo, listado de productos base de datos
let productos = [
    {id: 1, nombre: 'Prodocto 1', precio: 10.99},
    {id: 2, nombre: 'Prodocto 2', precio: 19.99},
    {id: 3, nombre: 'Prodocto 2', precio: 5.99},
];

route.get('/', (req, res) => {
    try{
        res.json(productos);
    }catch(err){
        next(err);
    }
    
});

// obtener producto por ID params
route.get('/:id', (req, res, next) => {
   try{
       const id = parseInt(req.params.id);
       const producto = productos.find((p) => p.id === id);
    
       if(!producto){
        const error = new Error('Producto no encontrado');
        error.status = 404;
        throw error; // es parecido al return.
       }
       res.json(producto)
   }catch(err){
    next(err);
   }
});

//Crear un nuevo producto
route.post('', (req, res, next) => {
    try{
       const {nombre , precio} = req.body;
   
       const nuevoProducto = {
           id: productos.length + 1,
           nombre,
           precio,
       };

       productos.push(nuevoProducto);
       res.status(201).json(nuevoProducto); // cod de resp ok
   } catch(err){
    next(err);
   }
});

// Actualizar un producto existen
route.put("/:id", ( req, res, next) => {
    try{
        const id = parseInt(req.params.id);
        const {nombre, precio} = req.body;
    
        const producto = productos.find((p) => p.id === id);
        
        if(!producto){
            const error = new Error('Producto no encontrado');
            error.status = 404;
            throw error; // es parecido al return.
        }

        producto.nombre = nombre || producto.nombre;
        producto.precio = precio || producto.precio
    
        res.json(producto);
    }catch(err){
        next(err);
    }

});

//Eliminar un producto
route.delete('/:id', (req, res, next) =>{
    try{
        const id = parseInt(req.params.id);
        const index = productos.findIndex((p) => p.id === id)

        if(index === -1){
            const error = new Error('Producto no encontrado');
            error.status = 404;
            throw error; // es parecido al return.
        }

        const productoEliminado = productos.splice(index, 1);
        res.json(productoEliminado[0]);
    } catch(err){
        next(err);
    }
    });

module.exports = route;