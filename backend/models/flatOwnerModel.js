const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Validator = require("validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const flatOwnerSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "A flat owner must have a name"],
	},
	email: {
		type: String,
		required: [true, "A flat owner must have a email"],
	},
	gender: {
		type: String,
		enum: ["male", "female", "other"],
	},
	photo: {
		public_id: {
			type: String,
		},
		url: {
			type: String,
		},
	},
	bio: {
		type: String,
	},
	role: {
		type: String,
		default: "flatowner",
	},
	password: {
		type: String,
		required: [true, "A recruiter must have a password"],
		minlength: [8, "A password must have atleast 8 character"],
		select: false,
	},
	passwordResetToken: String,
	passwordResetExpires: Date,
});

// Encrypt Password before save
flatOwnerSchema.pre("save", async function (next) {
	//Only run this function if password is modified
	if (!this.isModified("password")) return next();

	//Hash the password with cost of 12
	this.password = await bcrypt.hash(this.password, 10);

	next();
});

flatOwnerSchema.methods.correctPassword = function (
	candidatePassword,
	userPassword
) {
	return bcrypt.compare(candidatePassword, userPassword);
};

flatOwnerSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const flat_owner = mongoose.model("FlatOwner", flatOwnerSchema);
module.exports = flat_owner;
