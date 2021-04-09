const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {
		type:String,
		required: [true, "First name is required"]
	},
	// lastname
	lastName: {
		type: String,
		required: [true, "Last name is required"]
	},
	// email
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: [true, "Email is already exists"]
	},
	// password
	password: {
		type: String
	},
	// isAdmin
	isAdmin: {
		type: Boolean,
		default: false
	},
	// mobileNo.
	mobileNo: {
		type: String
	},
	loginType: {
		type: String,
		required: [true, 'loginType is required']
	},
	ledger: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Ledger'
		}
	],
	categories: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Categories'
		}
	]
})

module.exports = mongoose.model("User", userSchema);