const express = require( 'express' );
const { getProducts, createProduct, getProductById, deleteProductById, updateProductByIdPut, updateProductByIdPatch } = require('../controllers/product.controller');

const router = express.Router();

// http://localhost:<port>/api/products/
router.get( '/', getProducts );

// http://localhost:<port>/api/products/
router.post( '/', createProduct );

// http://localhost:<port>/api/products/<product-id>
// req.params.pedro = 7654ftgyhuji
router.get( '/:id', getProductById );

// http://localhost:<port>/api/products/<product-id>
router.delete( '/:id', deleteProductById );

// http://localhost:<port>/api/products/<product-id>
router.put( '/:id', updateProductByIdPut );

// http://localhost:<port>/api/products/<product-id>
router.patch( '/:id', updateProductByIdPatch );


module.exports = router;