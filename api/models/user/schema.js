const mongoose=require("mongoose");

const userModel = new mongoose.Schema({
    /*username: String,
    email: String,
    imageURL: String,
    description: String*/
    student:String,
    age:Number,
    school:String
});

module.exports=mongoose.model("tabla2",userModel);