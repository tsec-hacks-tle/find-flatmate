const express = require("express");
const { route } = require("express/lib/application");
const authController = require("../controllers/authController");
const roomController = require("../controllers/roomController");
const { protect } = require("../middlewares/auth");
const User = require("../models/tenentModel");

const router = express.Router();

router
	.route("/")
	.post(roomController.getAllProjects)
	.post(protect(User), roomController.addProject);

router.get("/me", protect(User), roomController.getMyProjects);

router
	.route("/:id")
	.get(roomController.getProject)
	.patch(protect(User), roomController.updateProject)
	.delete(protect(User), roomController.deleteProject);

module.exports = router;
