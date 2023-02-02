const express = require("express");
const authController = require("../controllers/authController");
const tenantController = require("../controllers/tenantController");
const handlerFactory = require("../controllers/handlerFactory");
const { protect } = require("../middlewares/auth");
const Tenant = require("../models/tenantModel");

const router = express.Router();

router.post("/signup", authController.signupTenant);
router.post("/login", authController.loginTenant);
router.get("/logout", handlerFactory.logout);

router.post("/forgotPassword", authController.forgotPasswordTenant);
router.patch("/resetPassword/:token", authController.resetPasswordTenant);

router.get("/me", protect(Tenant), tenantController.getMe);

router.patch("/updateMe", protect(Tenant), tenantController.updateMe);

// This is kept done as other routes might affect :id
router.route("/").post(protect(Tenant), tenantController.getAllTenants);
router.route("/:id").get(protect(Tenant), tenantController.getTenant);

module.exports = router;
