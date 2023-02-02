const express = require("express");
const { route } = require("express/lib/application");
const authController = require("../controllers/authController");
const roomController = require("../controllers/roomController");
const { protect } = require("../middlewares/auth");
const FlatOwner = require("../models/flatOwnerModel");
const Tenant = require("../models/tenantModel");

const router = express.Router();

router.route("/").post(protect(Tenant), roomController.getAllRooms);

router.route("/add").post(protect(FlatOwner), roomController.addRoom);

router.get("/me", protect(FlatOwner), roomController.getMyRooms);

router
	.route("/:id")
	.get(protect(Tenant), roomController.getRoom)
	.patch(protect(FlatOwner), roomController.updateRoom)
	.delete(protect(FlatOwner), roomController.deleteRoom);

module.exports = router;
