const express = require('express');
const router = express.Router();

const { getOrders, postOrder, getStatus, updateStatus } = require('../controllers/orderController');
const { stockManagement } = require('../middlewares/productMiddleware');
const { userById, AddPurchaseToUserHistory } = require("../middlewares/userMiddleware");
const { orderById } = require('../middlewares/orderMiddleware');
const { requireSignIn, isAuth, isAdmin } = require('../middlewares/authMiddleware');

router.get('/:userId', [ requireSignIn, isAuth, isAdmin ], getOrders);
router.post('/add/:userId', [ requireSignIn, isAuth, stockManagement, AddPurchaseToUserHistory ], postOrder);
router.get('/status/:userId', [ requireSignIn, isAuth, isAdmin ], getStatus);
router.patch('/:orderId/status/update/:userId', [ requireSignIn, isAuth, isAdmin ], updateStatus);

router.param('userId', userById);
router.param('orderId', orderById);

module.exports = router;