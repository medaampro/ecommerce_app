const express = require("express");
const router = express.Router();

const {readLogo, writeLogo} = require("../controllers/appController");
const {userById} = require("../middlewares/userMiddleware");
const {requireSignIn, isAuth, isAdmin } = require("../middlewares/authMiddleware");

router.get("/readLogo", readLogo);
router.post("/writeLogo/:userid", [requireSignIn, isAuth, isAdmin], writeLogo);

router.param("userid", userById);

module.exports = router;
