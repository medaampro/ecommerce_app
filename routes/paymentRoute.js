const express = require("express");
const router = express.Router();

const {getToken, createTransaction} = require("../controllers/paymentController");
const {userById} = require("../middlewares/userMiddleware");
const {requireSignIn, isAuth, isAdmin} = require("../middlewares/authMiddleware");

router.get("/getToken/:userId", [requireSignIn, isAuth], getToken);
router.post("/checkout/:userId", [requireSignIn, isAuth], createTransaction);

router.param("userId", userById)

module.exports = router;
