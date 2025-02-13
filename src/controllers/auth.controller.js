const { verifyEncriptedPassword } = require("../helpers/bcrypt.helper");
const { generateToken } = require("../helpers/jwt.helper");
const { dbGetUserByUsername, dbInsertUser } = require("../services/user.service");

async function registerUser( req, res ) {
    // Paso 1: Obtener los datos a registrar (usuario)
    const inputData = req.body;

    try {
        // Paso 2: Verificar si el usuario existe BD  ---> email
        const userFound = await dbGetUserByUsername( inputData.username );

        if( userFound ) {
            return res.json({
                ok: false,
                msg: 'El usuario ya existe.'
            });
        }

        // Paso 3: Registrar usuario (No existe)
        const data =  await dbInsertUser( inputData );
        console.log( data );   
        
        // Paso Opcional: Generar las credenciales (Token) y esto autenticara al usuario

        // Paso 4: Responder al cliente, si el usuario a sido registrado
        res.json({
            ok: true,
            data
        });
    } 
    catch ( error ) {
        console.error( error );
        res.json({
            ok: false,
            msg: 'Error al registrar usuario'
        });
    }
    
}

async function loginUser( req, res ) {
    // Paso 1: Obtener los datos para autenticar el usuario (username, password) 
    const inputData = req.body;

    try {
        // Paso 2: Verificar si el usuario existe en la BD  -->  email
        const userFound = await dbGetUserByUsername( inputData.username );
        
        if( ! userFound ) {
            return res.json({
                ok: false,
                msg: 'El usuario no existe. Por favor registrese'
            });
        }

        // Paso 3: Verificar si la contrasenia conhincide
        const isValidPassword = verifyEncriptedPassword( inputData.password, userFound.password );

        if( ! isValidPassword ) {
            return res.json({
                ok: false,
                msg: 'Contraseña invalida'
            });
        }

        // Paso 4: Generar credencial para autenticacion pasiva (Token)
        const payload = {
            id: userFound._id,
            name: userFound.name,
            username: userFound.username,
            role: userFound.role
        };
        
        const token = generateToken( payload );

        // Paso 5: Responder al cliente enviandole el Token
        res.json({
            ok: true,
            token,
            data: userFound
        });

    } 
    catch ( error ) {
        console.error( error );
        res.json({
            ok: false,
            msg: 'Error al ingresar a la aplicacion'
        });        
    }
}

function reNewToken( req, res ) {
    // Paso 1: Obtener el payload del objeto Request
    const payload = req.authUser;

    // Paso 2: Genera nuevo Token con payload del Token anterior
    const newToken = generateToken( payload );

    // Paso 3: Envia el Token al cliente
    res.json({
        ok: true,
        token: newToken
    });
}
   

module.exports = {
    registerUser,
    loginUser,
    reNewToken
};