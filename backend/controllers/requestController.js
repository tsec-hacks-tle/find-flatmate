const Request = require("../models/roomModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getMyRequests = catchAsync(async (req, res, next) => {
	const id = req.user._id;

	const requests = await Request.find({ tenant: id }).populate({
		path: "room",
		populate: {
			path: "flatOwner",
		},
	});

	res.status(201).json({
		status: "success",
		data: {
			data: requests,
		},
	});
});

exports.addRequest = catchAsync(async (req, res, next) => {
	console.log(req);

	const request = await Request.create(req.body);

	res.status(201).json({
		status: "success",
		data: {
			data: request,
		},
	});
});

exports.deleteRoom = catchAsync(async (req, res, next) => {
	// 1. Check if the room exits
	const request = await Request.findById(req.params.id);

	if (!request) return next(new AppError("Room not found", 404));

	// 3. Delete Request
	await Room.findByIdAndDelete(req.params.id);

	res.status(202).json({
		status: "success",
	});
});
