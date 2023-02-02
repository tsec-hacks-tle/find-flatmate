const express = require("express");
const { route } = require("express/lib/application");
const authController = require("../controllers/authController");
const roomController = require("../controllers/roomController");
const { protect } = require("../middlewares/auth");
const FlatOwner = require("../models/flatOwnerModel");

const router = express.Router();

router
	.route("/")
	.post(roomController.getAllRooms)
	.post(protect(FlatOwner), roomController.addRoom);

router.get("/me", protect(FlatOwner), roomController.getMyRooms);

router
	.route("/:id")
	.get(roomController.getRoom)
	.patch(protect(FlatOwner), roomController.updateRoom)
	.delete(protect(FlatOwner), roomController.deleteRoom);

module.exports = router;
