const cloudinary = require("cloudinary");
const Room = require("../models/roomModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const handlerFactory = require("./handlerFactory");

exports.getAllProjects = handlerFactory.getAll(Room);
exports.getProject = handlerFactory.getOne(Room, {
	// path: "user",
	// select: "name photo title",
});

exports.getMyProjects = catchAsync(async (req, res, next) => {
	const id = req.user._id;

	const projects = await Project.find({ user: id });

	res.status(201).json({
		status: "success",
		data: {
			data: projects,
		},
	});
});

exports.addProject = catchAsync(async (req, res, next) => {
	const file = req?.files?.photo;

	console.log(req);

	let images = [];
	if (typeof req.body.images === "string") {
		images.push(req.body.images);
	} else {
		images = req.body.images;
	}

	let imagesLinks = [];

	for (const element of images) {
		const result = await cloudinary.v2.uploader.upload(element, {
			folder: "products",
		});

		imagesLinks.push({
			public_id: result.public_id,
			url: result.secure_url,
		});
	}

	req.body.images = imagesLinks;
	req.body.user = req.user.id;

	const project = await Project.create(req.body);

	res.status(201).json({
		status: "success",
		data: {
			data: project,
		},
	});
});

exports.updateProject = catchAsync(async (req, res, next) => {
	// 1. Check if the projects exits
	const project = await Project.findById(req.params.id);

	if (!project) return next(new AppError("Project not found", 404));

	// Only the projects belonging to the user can be updated
	if (req.user.id !== project.user.toString()) {
		return next(new AppError("User not authorized", 404));
	}

	const newProjectData = req.body;

	// User Profile Photo
	if (req?.body?.photo !== "" && req?.body?.photo !== undefined) {
		// Update new photo
		const file = req.body.photo;

		// TODO: Check if the user has not changes his photo. If yes not perform these steps
		// delete previous image from cloudinary
		if (project?.photo?.public_id) {
			cloudinary.v2.uploader.destroy(project.photo.public_id);
		}

		// add new image
		const result = await cloudinary.v2.uploader.upload(file, {
			folder: process.env.CLOUDINARY_USER_PROJECTS,
			width: 150,
			crop: "scale",
		});

		newProjectData.photo = {
			public_id: result.public_id,
			url: result.secure_url,
		};
	}

	if (req.body.photo === "") delete newProjectData.photo;

	// 3.Update the project
	const updatedProject = await Project.findByIdAndUpdate(
		req.params.id,
		newProjectData,
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		success: true,
		data: {
			project: updatedProject,
		},
	});
});

exports.deleteProject = catchAsync(async (req, res, next) => {
	// 1. Check if the projects exits
	const project = await Project.findById(req.params.id);

	if (!project) return next(new AppError("Project not found", 404));

	// 2. Delete photos from cloudinary
	cloudinary.v2.uploader.destroy(project.photo.public_id);

	// 3. Delete Project
	await Project.findByIdAndDelete(req.params.id);

	res.status(202).json({
		status: "success",
	});
});
