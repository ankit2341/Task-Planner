const mongoose=require("mongoose");

const sprintSchema=mongoose.Schema({
    startDate:String,
    endDate:String,
    title:String,
});

const SprintModel=mongoose.model("sprint",sprintSchema);

module.exports={
    SprintModel
}