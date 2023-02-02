const crypto = require("crypto");
const catchAsync = require("../utils/catchAsync");
const createSendToken = require("../utils/createSendToken");
const AppError = require("../utils/appError");
const Email = require("../utils/email");
const Room = require("../models/roomModel");
const APIFeatures = require("../utils/apiFeatures");

exports.signup = (Model) =>
	catchAsync(async (req, res, next) => {
		// Check if email exists
		const user = await Model.findOne({ email: req.body.email });

		// If exists show error
		if (user) return next(new AppError(`Email already exists`, 400));

		// Create new user if all valid
		const newUser = await Model.create(req.body);

		// Send welcoming email

		// Create JWT Token and send
		createSendToken(newUser, 201, req, res);
	});

exports.login = (Model) =>
	catchAsync(async (req, res, next) => {
		const { email, password } = req.body;

		//1) Check if email and password exists
		if (!email || !password) {
			return next(new AppError("Please provide email and password", 400));
		}

		//2) Check if the email exists and password is correct
		const user = await Model.findOne({ email }).select("+password");

		//checks if user exists and if password is correct or not
		if (!user || !(await user.correctPassword(password, user.password))) {
			return next(new AppError("Incorrect email or password", 401));
		}

		//3) if everything ok, send the token to client
		createSendToken(user, 200, req, res);
	});

exports.logout = catchAsync((req, res, next) => {
	res.cookie("token", "null", {
		expires: new Date(Date.now() - 10 * 1000),
		httpOnly: true,
	});

	res.status(200).json({ status: "success" });
});

exports.forgotPassword = (Model, type) =>
	catchAsync(async (req, res, next) => {
		//Get the posted email
		if (!req.body.email) {
			return next(new AppError("Please provide your email", 400));
		}

		const user = await Model.findOne({ email: req.body.email });

		if (!user) {
			return next(
				new AppError("The user with email does not exist", 404)
			);
		}

		//Generate the random reset token
		const resetToken = user.createPasswordResetToken();

		//Save the passwordTokens fields in the database
		await user.save({ validateBeforeSave: false });

		// Send it to the user's email

		try {
			let resetURL;
			if (process.env.NODE_ENV === "DEVELOPMENT") {
				resetURL = `http://localhost:3000/${type}/resetPassword/${resetToken}`;
			} else {
				//TODO: add the hosted url
				resetURL = `https://programmer-recruiter-krish.onrender.com/${type}/resetPassword/${resetToken}`;
			}

			await new Email(user, resetURL).sendResetPassword();

			res.status(200).json({
				status: "success",
				message: "Link sent to email!",
			});
		} catch (err) {
			user.passwordResetToken = undefined;
			user.passwordResetExpires = undefined;
			await user.save({ validateBeforeSave: false });

			return next(
				new AppError(
					"There was an error sending the email. Try again later",
					500
				)
			);
		}
	});

exports.resetPassword = (Model) =>
	catchAsync(async (req, res, next) => {
		//1)Get the user from the token passed
		const hashedToken = crypto
			.createHash("sha256")
			.update(req.params.token)
			.digest("hex");

		const user = await Model.findOne({
			passwordResetToken: hashedToken,
			passwordResetExpires: { $gt: Date.now() },
		});

		//2)If the token not is not expired and there is a user, set the new password
		if (!user) {
			next(new AppError("Token is invalid or expired"));
		}

		if (!req.body.password) {
			return next(new AppError("Please provide password"));
		}

		user.password = req.body.password;
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save();

		res.status(200).json({
			status: "success",
			message: "Password changed successfully",
		});
	});

exports.getAll = (Model) =>
	catchAsync(async (req, res, next) => {
		const features = new APIFeatures(Model.find(), req.query, req.body)
			.filter()
			.keyword()
			.search()
			.sort()
			.limitFields()
			.paginate();

		//EXECUTE QUERY
		const doc = await features.query; // on awaiting, the query will be executed and returns all the matched docs
		// Here the query will contain query.sort().select().skip().limit()

		console.log("-->" + req.query);
		let filteredDoc = doc;

		if (doc[0]?.role == "tenant") {
			filteredDoc = doc.filter((obj) => obj._id != req.user.id);
			for (let i = 0; i < filteredDoc.length; i++) {
				let match = 0;
				if (filteredDoc[i].gender === req.user.gender) {
					match += 30;
				}
				if (filteredDoc[i].profession === req.user.profession) {
					match += 20;
				}
				const similarHobbies = filteredDoc[i].hobbies.filter((value) =>
					req.user.hobbies.includes(value)
				);
				if (similarHobbies.length === 1) {
					match += 10;
				} else if (similarHobbies.length === 2) {
					match += 15;
				} else if (similarHobbies.length !== 0) {
					match += 20;
				}
				if (filteredDoc[i].religion === req.user.religion) {
					match += 15;
				}
				if (
					filteredDoc[i].food_preference === req.user.food_preference
				) {
					match += 15;
				}

				filteredDoc[i].match = match;
			}
		} else {
			for (let i = 0; i < filteredDoc.length; i++) {
				console.log(req.query);
				let match = 0;
				if (filteredDoc[i].religion === req.user.religion) {
					match += 10;
				}
				const similar = filteredDoc[i].preferences.filter((value) =>
					req.user.hobbies.includes(value)
				);
				if (similar.length === 1) {
					match += 10;
				} else if (similar.length === 2) {
					match += 15;
				} else if (similar.length !== 0) {
					match += 20;
				}
				if (
					!req.query.state ||
					req.query.state === filteredDoc[i].state
				) {
					match += 10;
				}
				if (
					!req.query.city ||
					req.query.city === filteredDoc[i].city[0]
				) {
					match += 10;
				}
				if (
					!req.query.postalCode ||
					req.query.postalCode === filteredDoc[i].postalCode
				) {
					match += 10;
				}
				if (
					!req.query.ratingsAverage ||
					req.query.ratingsAverage <= filteredDoc[i].ratingsAverage
				) {
					match += 15;
				}
				let priceLB = req.query?.price?.gte;
				let priceUB = req.query?.price?.lte;
				if (priceLB && priceUB) {
					if (
						filteredDoc[i].price >= priceLB &&
						filteredDoc[i].price <= priceUB
					) {
						match += 25;
					}
				} else if (priceLB) {
					if (filteredDoc[i].price >= priceLB) {
						match += 25;
					}
				} else if (priceUB) {
					if (filteredDoc[i].price <= priceUB) {
						match += 25;
					}
				} else {
					match += 25;
				}
				filteredDoc[i].match = match;
			}
		}

		const matchSorted = filteredDoc.sort((a, b) => b.match - a.match);

		if (!matchSorted) {
			return next(new AppError("Not found"));
		}

		res.status(200).json({
			success: true,
			results: matchSorted.length,
			data: matchSorted,
		});
	});

exports.getMe = (Model, popOptions) =>
	catchAsync(async (req, res, next) => {
		let query = Model.findById(req.user.id);
		if (popOptions) query = query.populate(popOptions);

		const doc = await query;

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

//The popOptions is needed as if any fields gets populated and then shows
exports.getOne = (Model, popOptions) =>
	catchAsync(async (req, res, next) => {
		let query = Model.findById(req.params.id);
		if (popOptions) query = query.populate(popOptions);

		const doc = await query;

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

// Collection controllers
exports.getMyCollections = (Model) =>
	catchAsync(async (req, res, next) => {
		let collections = await Model.findById(req.user.id).populate({
			path: "collections",
		});

		collections = collections.collections;

		res.status(200).json({
			success: true,
			results: collections.length,
			data: {
				collections,
			},
		});
	});

exports.saveProjectToCollection = (Model) =>
	catchAsync(async (req, res, next) => {
		// As collection is an array in user field so we will push to project id in collection array

		// 1. Check if the project is already added in the array
		const projectFound = await Model.findOne({
			_id: req.user.id,
			collections: { $elemMatch: { $eq: req.params.id } },
		});

		if (projectFound) return next(new AppError("Room already added", 404));

		const project =
			(await Room.findById(req.params.id)) &&
			(await Model.findByIdAndUpdate(
				req.user.id,
				{
					$push: { collections: req.params.id },
				},
				{
					new: true,
				}
			));

		if (!project) return next(new AppError("Room not found", 404));

		res.status(200).json({
			success: true,
			message: "Room added successfully",
		});
	});

exports.removeProjectFromCollection = (Model) =>
	catchAsync(async (req, res, next) => {
		await Model.findByIdAndUpdate(
			req.user.id,
			{
				$pull: { collections: req.params.id },
			},
			{
				new: true,
			}
		);

		res.status(200).json({
			success: true,
			message: "Room removed successfully",
		});
	});
