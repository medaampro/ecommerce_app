const express = require('express');
const router = express.Router();

const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { userById } = require('../middlewares/userMiddleware');
const { requireSignIn, isAuth, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', requireSignIn, getUsers);
router.get('/:userid', requireSignIn, getUser);
router.put('/edit/:userid', [requireSignIn, isAuth, isAdmin], updateUser);
router.delete('/delete/:userid', [requireSignIn, isAdmin], deleteUser);

router.param('userid', userById);

module.exports = router;