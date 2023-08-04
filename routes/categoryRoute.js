const express = require("express");
const router = express.Router();

const {getCategories, getCategory, postCategory, updateCategory, deleteCategory} = require("../controllers/categoryController");
const {userById} = require("../middlewares/userMiddleware");
const {categoryById} = require("../middlewares/categoryMiddleware");
const {requireSignIn, isAuth, isAdmin} = require("../middlewares/authMiddleware");

router.get("/", getCategories);
router.get("/:categoryid" , [requireSignIn], getCategory);
router.post("/add/:userid", [requireSignIn, isAuth], postCategory);
router.put("/edit/:userid/:categoryid", [requireSignIn, isAuth], updateCategory);
router.delete("/delete/:userid/:categoryid", [requireSignIn, isAuth], deleteCategory);

router.param("userid", userById);
router.param("categoryid", categoryById);

module.exports = router;
