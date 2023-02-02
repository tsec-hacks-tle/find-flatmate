const express = require("express");
const authController = require("../controllers/authController");
const tenantController = require("../controllers/tenantController");
const handlerFactory = require("../controllers/handlerFactory");
const { protect } = require("../middlewares/auth");
const Tenant = require("../models/tenantModel");

const router = express.Router();

router.post("/signup", authController.signupUser);
router.post("/login", authController.loginUser);
router.get("/logout", handlerFactory.logout);

router.post("/forgotPassword", authController.forgotPasswordUser);
router.patch("/resetPassword/:token", authController.resetPasswordUser);

router.get("/me", protect(Tenant), tenantController.getMe);

router.patch("/updateMe", protect(Tenant), tenantController.updateMe);

// This is kept done as other routes might affect :id
router.route("/").post(tenantController.getAllUsers);
router.route("/:id").get(tenantController.getUser);

module.exports = router;
