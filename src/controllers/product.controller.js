const { dbInsertProduct, dbGetProducts, dbGetProductById, dbDeleteProductById } = require("../services/product.service");


async function getProducts( req, res ) {

    try {
        const data = await dbGetProducts();

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
            msg: 'Ha ocurrido una excepcion al obtener todos los datos'
        });
    }

}

async function createProduct( req, res ) {
    const inputData = req.body;

    try {
        const data = await dbInsertProduct( inputData );

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
            msg: 'Ha ocurrido una excepcion al registrar los datos'
        });
    }

}

async function getProductById( req, res ) {
    const id = req.params.id;

    try {
        const data = await dbGetProductById( id );

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
            msg: 'Ha ocurrido una excepcion al obtener los datos por ID'
        });
    }
    
} 

async function deleteProductById( req, res ) {
    const id = req.params.id;
    
    try {
        const data = await dbDeleteProductById( id );

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
            msg: 'Ha ocurrido una excepcion al eliminar los datos por ID'
        });
    }

}

function updateProductByIdPut( req, res ) {
    const id = req.params.id;
    res.json({
        ok: true,
        msg: `Actualiza todos los recursos de un producto por ID: ${ id }`
    });
}

function updateProductByIdPatch( req, res ) {
    const id = req.params.id;
    res.json({
        ok: true,
        msg: `Actualiza parcialmente los recursos de un producto por ID: ${ id }`
    });
}

// module.exports = getProducts;  // Export Default
module.exports = {
    getProducts,
    createProduct,
    getProductById,
    deleteProductById,
    updateProductByIdPut,
    updateProductByIdPatch
};