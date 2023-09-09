const mongoose=require("mongoose");

const userModel = new mongoose.Schema({
    username: String,
    email: String,
    imageURL: String,
    description: String
});

module.exports=mongoose.model("User",userModel);