const cloudinary = require("cloudinary");
const Room = require("../models/roomModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const handlerFactory = require("./handlerFactory");

exports.getAllRooms = handlerFactory.getAll(Room);
exports.getRoom = handlerFactory.getOne(Room, {
	// path: "user",
	// select: "name photo title",
});

exports.getMyRooms = catchAsync(async (req, res, next) => {
	const id = req.user._id;

	const rooms = await Room.find({ flatOwner: id });

	res.status(201).json({
		status: "success",
		data: {
			data: rooms,
		},
	});
});

exports.addRoom = catchAsync(async (req, res, next) => {
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
			folder: process.env.CLOUDINARY_ROOM_PHOTO,
		});

		imagesLinks.push({
			public_id: result.public_id,
			url: result.secure_url,
		});
	}

	req.body.images = imagesLinks;
	req.body.user = req.user.id;

	const room = await Room.create(req.body);

	res.status(201).json({
		status: "success",
		data: {
			data: room,
		},
	});
});

exports.updateRoom = catchAsync(async (req, res, next) => {
	// 1. Check if the room exits
	const room = await Room.findById(req.params.id);

	if (!room) return next(new AppError("Room not found", 404));

	// Only the room belonging to the user can be updated
	if (req.user.id !== room.flatOwner.toString()) {
		return next(new AppError("FlatOwner not authorized", 404));
	}

	const newRoomData = req.body;

	// User Profile Photo
	if (req?.body?.photo !== "" && req?.body?.photo !== undefined) {
		// Update new photo
		const file = req.body.photo;

		// TODO: Check if the user has not changed his photo. If yes not perform these steps
		// delete previous image from cloudinary
		if (room?.photo?.public_id) {
			cloudinary.v2.uploader.destroy(room.photo.public_id);
		}

		// add new image
		const result = await cloudinary.v2.uploader.upload(file, {
			folder: process.env.CLOUDINARY_USER_PROJECTS,
			width: 150,
			crop: "scale",
		});

		newRoomData.photo = {
			public_id: result.public_id,
			url: result.secure_url,
		};
	}

	if (req.body.photo === "") delete newRoomData.photo;

	// 3.Update the room
	const updatedRoom = await Room.findByIdAndUpdate(
		req.params.id,
		newRoomData,
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		success: true,
		data: {
			room: updatedRoom,
		},
	});
});

exports.deleteRoom = catchAsync(async (req, res, next) => {
	// 1. Check if the room exits
	const room = await Room.findById(req.params.id);

	if (!room) return next(new AppError("Room not found", 404));

	// 2. Delete photos from cloudinary
	cloudinary.v2.uploader.destroy(room.photo.public_id);

	// 3. Delete Room
	await Room.findByIdAndDelete(req.params.id);

	res.status(202).json({
		status: "success",
	});
});
