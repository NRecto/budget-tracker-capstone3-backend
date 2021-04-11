const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Category type is required']
    },
    type: {
        type: String,
        required: [true, `Category Type is required`]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model("Categories", categoriesSchema)