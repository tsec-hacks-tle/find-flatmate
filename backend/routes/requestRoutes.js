const express = require("express");
const { route } = require("express/lib/application");
const requestController = require("../controllers/requestController");
const { protect } = require("../middlewares/auth");
const FlatOwner = require("../models/flatOwnerModel");
const Tenant = require("../models/tenantModel");

const router = express.Router();

router.get("/me", protect(Tenant), requestController.getMyRequests);

router
	.route("/:id")
	.get(protect(FlatOwner), requestController.getRequestsByRoom)
	.post(protect(Tenant), requestController.addRequest)
	.delete(protect(FlatOwner, Tenant), requestController.deleteRequest);

router
	.route("/approve/:id")
	.patch(protect(FlatOwner), requestController.approveRequest);

module.exports = router;
