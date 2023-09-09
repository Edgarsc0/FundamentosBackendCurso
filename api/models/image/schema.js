const mongoose = require("mongoose");

const imageModel = new mongoose.Schema({
    idOwner: String,
    currentString: String,
    autor: String
});

module.exports = mongoose.model("Image", imageModel);