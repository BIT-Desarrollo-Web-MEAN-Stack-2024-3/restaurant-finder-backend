const verifyProperties = require("../helpers/verify-properies.helper");
const CategoryModel = require("../models/category.model");
const { dbInsertCategory, dbGetCategories, dbGetCategoryById, dbDeleteCategoryById, dbUpdateCategoryById } = require("../services/category.service");

async function createCategory( req, res ) {
    const inputData = req.body;
    
    inputData.userId = req.authUser.id;

    try {
        const data = await dbInsertCategory( inputData );

        res.json({
            ok: true,
            data: data
        });    
    } 
    catch ( error ) {
        /** Validamos si existen los errores de validacion */
        if( error?.name === 'ValidationError' ) {
            const errors = verifyProperties( error );       // Extrae los mensajes de error por cada propiedad

            console.error( errors );           // Imprime error al Desarrollador
            // Envia un mensaje de error legible al cliente
            return res.json({
                ok: false,
                errors
            });
        }

        console.error( error );       // Imprime error al Desarrollador
        // Envia un mensaje de error legible al cliente
        res.json({                  
            ok: false,
            msg: 'Ha ocurrido una excepcion al registrar los datos'
        });
    }

}

async function getCategories( req, res ) {

    try {
        const data = await dbGetCategories();

        res.json({
            ok: true,
            data: data
        });        
    } 
    catch ( error ) {
        console.error( error );         // Imprime error al Desarrollador
        // Envia un mensaje de error legible al cliente
        res.json({
            ok: false,
            msg: 'Ha ocurrido una excepcion al obtener todos las categorias'
        });
    }

}

async function getCategoryById( req, res ) {
    const id = req.params.id;

    try {
        const data = await dbGetCategoryById( id );

        res.json({
            ok: true,
            data: data
        });
    } 
    catch ( error ) {
        console.error( error );       // Imprime error al Desarrollador
        // Envia un mensaje de error legible al cliente
        res.json({                  
            ok: false,
            msg: 'Ha ocurrido una excepcion al obtener una categoria por ID'
        });
    }
    
} 

async function deleteCategoryById( req, res ) {
    const id = req.params.id;
    
    try {
        const data = await dbDeleteCategoryById( id );

        res.json({
            ok: true,
            data: data
        });
    } 
    catch ( error ) {
        console.error( error );       // Imprime error al Desarrollador
        // Envia un mensaje de error legible al cliente
        res.json({                  
            ok: false,
            msg: 'Ha ocurrido una excepcion al eliminar una categoria por ID'
        });
    }

}

async function updateCategoryById( req, res ) {
    const id = req.params.id;
    const inputData = req.body;
    
    try {
        const data = await dbUpdateCategoryById( id, inputData );

        res.json({
            ok: true,
            data: data
        });
    } 
    catch ( error ) {
        console.error( error );       // Imprime error al Desarrollador
        // Envia un mensaje de error legible al cliente
        res.json({                  
            ok: false,
            msg: 'Ha ocurrido una excepcion al actualizar una categoria por ID'
        });
    }

}


module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    deleteCategoryById,
    updateCategoryById
}