const mongoose = require( 'mongoose' );

/** Paso 1: Definir una estructura de datos */
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [ 'registered', 'moderator', 'admin' ],
        default: 'registered'
    }
},{
    timestamps: true,
    versionKey: false
});

/** Paso 2: Vinculamos la estructura de datos a una coleccion dando como resultado un Modelo de datos */
const UserModel = mongoose.model(
    'users',            // Nombre de la coleccion donde se agruparan los documentos
    UserSchema          // Estructura de datos de la Entidad
);

// Exponemos la funcionalidad para que otros archivos puedan hacer uso de ella
module.exports = UserModel;


