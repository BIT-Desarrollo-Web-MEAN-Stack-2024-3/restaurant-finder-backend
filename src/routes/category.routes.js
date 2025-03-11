const express = require( 'express' );

const { createCategory, getCategories, getCategoryById, deleteCategoryById, updateCategoryById } = require('../controllers/category.controller');
const validateId = require('../middlewares/validate-id.middleware');
const validateCategoryExists = require('../middlewares/validate-category-exists.middleware');
const { validateAuthUser } = require('../middlewares/validate-auth-user.middleware');

const router = express.Router();


// http://localhost:<port>/api/categories/
router.get( '/', getCategories );

// http://localhost:<port>/api/categories/
router.post( '/', validateAuthUser, createCategory );

// http://localhost:<port>/api/categories/<category-id>
// req.params.pedro = 7654ftgyhuji
router.get( '/:id', [ validateId, validateCategoryExists ], getCategoryById );

// http://localhost:<port>/api/categories/<category-id>
router.delete( '/:id', [ validateAuthUser, validateId, validateCategoryExists ], deleteCategoryById );

// http://localhost:<port>/api/categories/<category-id>
router.patch( '/:id', [ validateAuthUser, validateId, validateCategoryExists ], updateCategoryById );


module.exports = router;