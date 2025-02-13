const { dbGetUserById, dbGetUserByUsername } = require("../services/user.service");

async function validateUserExist( req, res, next, exists ) {
    const { username } = req.body;

    try {
        const dataFound = await dbGetUserByUsername( username );
        console.info( dataFound, !! dataFound );

        if( ! exists ? ! dataFound : dataFound )
            return res.status( 404 ).json({
                ok: false,
                msg: `El usuario ${ exists ? 'no' : 'ya' } existe`
            });

        next();
    } 
    catch ( error ) {
        console.error( error );       // Imprime error al Desarrollador
        // Envia un mensaje de error legible al cliente
        res.status( 500 ).json({                  
            ok: false,
            msg: 'Ha ocurrido una excepcion al validar si el usuario existe'
        });
    }

}

function validateDocumentById ( cb ) {
    /**  */
    return async function( req, res, next ) {
        const id = req.params.id;

        try {
            const isValid = await cb( id );
            console.log( isValid );

            if( isValid )
                return res.status( 404 ).json({
                    ok: false,
                    msg: 'El documento no existe'
                });

            next();
        } 
        catch ( error ) {
            console.error( error );       // Imprime error al Desarrollador
            // Envia un mensaje de error legible al cliente
            res.status( 500 ).json({                  
                ok: false,
                msg: 'Ha ocurrido una excepcion al registrar un usuario'
            });
        }
    }
}


module.exports = {
    validateUserExist,
    validateDocumentById
};