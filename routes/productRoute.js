const express = require('express');
const router = express.Router();

const { getProducts, getProduct, relatedProducts, filterProducts, photoProduct, postProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { productById } = require('../middlewares/productMiddleware');
const { userById } = require('../middlewares/userMiddleware');
const { requireSignIn, isAuth, isAdmin } = require('../middlewares/authMiddleware');

router.get('/' ,getProducts);
router.get('/:productId', getProduct);
router.get(`/:productId/photo`, photoProduct);    
router.get('/related/:productId', relatedProducts);
router.post('/filters', filterProducts);
router.post('/add/:userId', [requireSignIn, isAuth, isAdmin], postProduct);
router.put('/update/:productId/:userId', [requireSignIn, isAuth, isAdmin],updateProduct);
router.delete('/delete/:productId/:userId', [requireSignIn, isAuth, isAdmin], deleteProduct);

router.param('productId', productById);
router.param('userId', userById);

module.exports = router;