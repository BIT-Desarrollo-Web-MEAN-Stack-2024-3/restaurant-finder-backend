const express = require( 'express' );
const dbConection = require('./config/mongo.config.js');
// const conexionDB = require('./config/mongo.config.js');
const app = express();
const cors = require( 'cors' );


// Ejecuta la configuracion de Mongoose para Mongo
dbConection();      
// conexionDB();       

/** Middleware: Capacidad a Express de aceptar y comprender JSON */
app.use( express.json() );
app.use( cors() );

/** Middleware: Endpoints del sitio */
// http://localhost:<port>/api/products
app.use( '/api/products', require( './routes/product.routes.js' ) );
// http://localhost:<port>/api/categories
app.use( '/api/categories', require( './routes/category.routes.js' ) );
// http://localhost:<port>/api/users
app.use( '/api/users', require( './routes/user.routes.js' ) );
// http://localhost:<port>/api/users
app.use( '/api/auth', require( './routes/auth.routes.js' ) );


/** Lanzar servidor: http://localhost:<port> */
app.listen( 3000, function() {
    console.log( 'Servidor escuchando en el puerto 3000' );
});