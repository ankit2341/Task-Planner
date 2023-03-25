const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    avatar:String,
});

const UserModel=mongoose.model("users",userSchema);

module.exports={
    UserModel
}