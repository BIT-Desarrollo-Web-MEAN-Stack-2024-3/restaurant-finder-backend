const express = require( 'express' );

const { getUsers, createUser, getUserById, deleteUserById, updateUserById } = require('../controllers/user.controller');

const validateId = require('../middlewares/validate-id.middleware');
const { validateDocumentById, validateUserExist } = require('../middlewares/validate-document.middleware');
const { userExistsById } = require('../helpers/validate-document');


const router = express.Router();


// http://localhost:<port>/api/users/
router.get( '/', getUsers );

// http://localhost:<port>/api/users/
router.post( 
    '/', 
    ( req, res, next ) => validateUserExist( req, res, next, false ), 
    createUser 
);

// http://localhost:<port>/api/users/<category-id>
// req.params.pedro = 7654ftgyhuji
router.get( 
    '/:id', 
    [ validateId, validateDocumentById( userExistsById ) ], 
    getUserById 
);

// http://localhost:<port>/api/users/<category-id>
router.delete( 
    '/:id', 
    [ validateId, validateDocumentById( userExistsById ) ], 
    deleteUserById 
);

// http://localhost:<port>/api/users/<category-id>
router.patch( 
    '/:id', 
    [ validateId, validateDocumentById( userExistsById ) ], 
    updateUserById 
);


module.exports = router;