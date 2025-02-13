const { dbGetUserById } = require("../services/user.service");


async function userExistsById( id ) {
    const dataFound = await dbGetUserById( id );
    console.info( dataFound, !! dataFound );

    return !! dataFound;
}


module.exports = {
    userExistsById
}