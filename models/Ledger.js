const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
    createdOn: {
        type: Date,
        default: new Date()
    },
    dateOftransaction: {
        type: Date,
        default: new Date()
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    amount: {
        type:Number,
        required: [true, 'amount is required'],
        default: 0
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    type: {
        type: String,
        required: [true, 'category type is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Categories"
	}

})

module.exports = mongoose.model("Ledger", ledgerSchema)