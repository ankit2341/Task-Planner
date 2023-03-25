const mongoose=require("mongoose");

const taskSchema=mongoose.Schema({
    title:String,
    type:String,
    assigneeId:String,
    assigneeName:String,
    assigneeAvatar:String,
    sprintId:String,
    status:String
});

const TaskModel=mongoose.model("tasks",taskSchema);

module.exports={
    TaskModel
}
