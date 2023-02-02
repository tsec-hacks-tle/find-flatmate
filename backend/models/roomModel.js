const mongoose = require("mongoose");
const hobbies_list = require("../utils/hobbies_list");
const religion_list = require("../utils/religion_list");
const city_list = require("../utils/city_list");
const state_list = require("../utils/state_list");
const postalcode_list = require("../utils/pincode_list");

const roomSchema = mongoose.Schema({
	city: {
		type: String,
		enum: city_list,
		required: [true, "A room must have a city"],
	},

	landmark: {
		type: String,
		required: [true, "A room must have a landmark"],
	},

	state: {
		type: String,
		enum: state_list,
		required: [true, "A room must have a state"],
	},

	postalCode: {
		type: String,
		enum: postalcode_list,
		required: [true, "A room must have a postalCode"],
	},

	buildingName: {
		type: String,
	},

	address: {
		type: "String",
		required: [true, "A room must have a address"],
	},

	photos: [
		{
			public_id: {
				type: String,
			},
			url: {
				type: String,
			},
		},
	],

	capacity: {
		type: Number,
	},

	tenants: [
		{
			type: mongoose.Schema.ObjectId,
			ref: "Tenant",
		},
	],

	flatOwner: {
		type: mongoose.Schema.ObjectId,
		ref: "FlatOwner",
	},

	religion: {
		type: String,
		enum: religion_list,
	},

	ratingsAverage: {
		type: Number,
		default: 4.5,
	},

	ratingsQuantity: {
		type: Number,
		default: 0,
	},

	reviews: [
		{
			content: {
				type: String,
			},
			rating: {
				type: Number,
				min: 1,
				max: 5,
			},
			createdAt: {
				type: Date,
				default: Date.now,
			},
			tenantId: {
				type: mongoose.Schema.ObjectId,
				ref: "Tenant",
			},
		},
	],

	availableStatus: {
		type: Boolean,
		default: true,
	},

	price: {
		type: Number,
		required: true,
	},

	match: {
		type: Number,
	},

	preferences: [
		{
			type: String,
			enum: hobbies_list,
		},
	],
});

const room = mongoose.model("room", roomSchema);
module.exports = room;
