const cloudinary = require("cloudinary");
const Room = require("../models/roomModel");
const Tenant = require("../models/tenantModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const handlerFactory = require("./handlerFactory");

exports.getAllTenants = handlerFactory.getAll(Tenant);
exports.getTenant = catchAsync(async (req, res, next) => {
	const doc = await Tenant.findById(req.params.id);

	if (!doc) {
		return next(new AppError("No document found with that ID", 404));
	}

	res.status(200).json({
		status: "success",
		data: {
			data: doc,
		},
	});
});
exports.getMe = handlerFactory.getMe(Tenant);

// Update Profile
// Update Tenant Profile ==> /api/v1/users/updateMe
exports.updateMe = catchAsync(async (req, res, next) => {
	if (req.body.password) {
		return next(
			new AppError(
				"This route is not for password updates. Please use /updateMyPassword.",
				400
			)
		);
	}

	if (req.body.role) {
		return next(new AppError("Tenant cannot edit role", 400));
	}

	const newTenantData = req.body;
	// Tenant Profile Photo
	if (req?.body?.photo !== "" && req?.body?.photo !== undefined) {
		console.log("Hello");
		// Update new photo
		const file = req.body.photo;
		// TODO: Check if the user has not changes his photo. If yes not perform these steps
		// delete previous image from cloudinary

		// TODO: Change this code for update images
		if (req.user?.photo?.public_id) {
			cloudinary.v2.uploader.destroy(req.user.photo.public_id);
		}

		// add new image
		const result = await cloudinary.v2.uploader.upload(file, {
			folder: process.env.CLOUDINARY_USER_PHOTO,
			width: 150,
			crop: "scale",
		});

		newTenantData.photo = {
			public_id: result.public_id,
			url: result.secure_url,
		};
	}

	if (req.body.photo === "") delete newTenantData.photo;

	const updatedTenant = await Tenant.findByIdAndUpdate(
		req.user.id,
		newTenantData,
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		success: true,
		data: {
			user: updatedTenant,
		},
	});
});
