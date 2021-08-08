const express = require('express');
const router = express.Router();

const { updateLogo, getLogo } = require('../controllers/appController');
const { userById } = require('../middlewares/userMiddleware');
const { requireSignIn, isAuth, isAdmin } = require('../middlewares/authMiddleware');


router.get('/getLogo', getLogo);
router.put('/updateLogo/:userid', [requireSignIn, isAuth, isAdmin] , updateLogo);

router.param('userid', userById);

module.exports = router;