const express = require("express");
const authController = require("../controllers/authController");
const flatOwnerController = require("../controllers/flatOwnerController");
const handlerFactory = require("../controllers/handlerFactory");
const { protect } = require("../middlewares/auth");
const FlatOwner = require("../models/flatOwnerModel");

const router = express.Router();

router.post("/signup", authController.signupFlatOwner);
router.post("/login", authController.loginFlatOwner);
router.get("/logout", handlerFactory.logout);

router.post("/forgotPassword", authController.forgotPasswordFlatOwner);
router.patch("/resetPassword/:token", authController.resetPasswordFlatOwner);

router.route("/me").get(protect(FlatOwner), flatOwnerController.getMe);
router
	.route("/updateMe")
	.patch(protect(FlatOwner), flatOwnerController.updateMe);

router.route("/").get(flatOwnerController.getAllFlatOwner);
router.route("/:id").get(flatOwnerController.getFlatOwner);

module.exports = router;
