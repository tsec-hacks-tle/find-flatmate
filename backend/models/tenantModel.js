const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Validator = require("validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const professions = require("../utils/profession_list");
const hobbies = require("../utils/hobbies_list");
const religions = require("../utils/religion_list");

const tenantSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "A tenant must have a name"],
		},

		email: {
			type: String,
			required: [true, "Please provide your email"],
			unique: true,
			lowercase: true,
			validate: [
				Validator.isEmail,
				"Your email is not valid. Please provide valid email",
			],
		},

		photo: {
			public_id: {
				type: String,
			},
			url: {
				type: String,
			},
		},

		phone_number: {
			type: String,
		},

		title: {
			type: String,
		},

		bio: {
			type: String,
		},

		age: {
			type: Number,
		},

		roomOccupied: {
			type: Boolean,
			default: false,
		},

		gender: {
			type: String,
			enum: ["male", "female", "other"],
		},

		profession: {
			type: String,
			enum: professions,
		},

		role: {
			type: String,
			default: "tenant",
		},

		hobbies: [
			{
				type: String,
				enum: hobbies,
			},
		],

		experience: {
			companyName: {
				type: String,
			},
			jobRole: {
				type: String,
			},
			employmentType: {
				type: String,
			},
		},

		education: {
			degree: {
				type: String,
			},
			college: {
				type: String,
			},
			specialization: {
				type: String,
			},
		},

		social_links: [
			{
				Type: {
					type: String,
				},
				Link: {
					type: String,
				},
			},
		],

		religion: {
			type: String,
			enum: religions,
		},

		food_preference: {
			type: String,
			enum: ["Veg", "Non-Veg"],
		},

		password: {
			type: String,
			required: [true, "A tenant must have a password"],
			minlength: [8, "A password must have at least 8 character"],
			select: false,
		},
		passwordResetToken: String,
		passwordResetExpires: Date,
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

// Encrypt Password before save
tenantSchema.pre("save", async function (next) {
	//Only run this function if password is modified
	if (!this.isModified("password")) return next();

	//Hash the password with cost of 12
	this.password = await bcrypt.hash(this.password, 10);

	next();
});

tenantSchema.methods.correctPassword = function (
	candidatePassword,
	tenantPassword
) {
	return bcrypt.compare(candidatePassword, tenantPassword);
};

tenantSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const Tenant = mongoose.model("Tenant", tenantSchema);
module.exports = Tenant;
