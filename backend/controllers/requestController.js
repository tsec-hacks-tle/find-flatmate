const Room = require("../models/roomModel");
const Request = require("../models/requestModel");
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

exports.getRequestsByRoom = catchAsync(async (req, res, next) => {
	const id = req.params.id;
	const requests = await Request.find({ room: id }).populate({
		path: "tenant",
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

	const body = { tenant: req.user.id, room: req.params.id };

	const request = await Request.create(body);

	res.status(201).json({
		status: "success",
		data: {
			data: request,
		},
	});
});

exports.deleteRequest = catchAsync(async (req, res, next) => {
	// 1. Check if the room exits
	const request = await Request.findById(req.params.id);

	if (!request) return next(new AppError("Request not found", 404));

	// 3. Delete Request
	await Request.findByIdAndDelete(req.params.id);

	res.status(202).json({
		status: "success",
	});
});

exports.approveRequest = catchAsync(async (req, res, next) => {
	const request = await Request.findByIdAndUpdate(req.params.id, {
		status: "approved",
	});

	if (!request) return next(new AppError("Request not found", 404));

	console.log(request);

	const room = await Room.findByIdAndUpdate(
		{ _id: request.room },
		{ $push: { tenants: request.tenant }, $inc: { capacity: 1 } }
	);

	if (room.capacity === room.maxCapacity) {
		await Room.updateOne(
			{
				_id: request.room,
			},
			{
				availableStatus: false,
			}
		);
	}

	res.status(202).json({
		status: "success",
	});
});
