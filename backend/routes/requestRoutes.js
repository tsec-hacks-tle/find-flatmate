const express = require("express");
const { route } = require("express/lib/application");
const requestController = require("../controllers/requestController");
const { protect } = require("../middlewares/auth");
const FlatOwner = require("../models/flatOwnerModel");
const Tenant = require("../models/tenantModel");

const router = express.Router();

router.get("/me", protect(Tenant, FlatOwner), requestController.getMyRequests);

router
	.route("/:id")
	.post(protect(Tenant), requestController.addRequests)
	.delete(protect(FlatOwner, Tenant), requestController.deleteRequests);

module.exports = router;
