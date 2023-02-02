const express = require("express");
const { route } = require("express/lib/application");
const authController = require("../controllers/authController");
const roomController = require("../controllers/roomController");
const { protect } = require("../middlewares/auth");
const Tenant = require("../models/tenentModel");

const router = express.Router();

router
	.route("/")
	.post(roomController.getAllRooms)
	.post(protect(Tenant), roomController.addRoom);

router.get("/me", protect(Tenant), roomController.getMyRooms);

router
	.route("/:id")
	.get(roomController.getRoom)
	.patch(protect(Tenant), roomController.updateRoom)
	.delete(protect(Tenant), roomController.deleteRoom);

module.exports = router;
