const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Validator = require("validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const requestSchema = mongoose.Schema(
	{
		tenant: {
			type: mongoose.Schema.ObjectId,
			ref: "Tenant",
		},
		room: {
			type: mongoose.Schema.ObjectId,
			ref: "Room",
		},
		status: {
			type: String,
			enum: ["pending", "approved", "rejected"],
			default: "pending",
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
