const mongoose = require("mongoose")

const schema = mongoose.Schema({
	name: String,
    price: Number,
    unit: String,
    description: String,
    popularity: Number,
    pictures: [String],
    catagories: [String]
})

module.exports = mongoose.model("Meat", schema)