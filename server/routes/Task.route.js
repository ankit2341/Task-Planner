const express = require("express");
const { TaskModel } = require("../model/Task.model");
const tasksRouter = express.Router();

tasksRouter.get("/", async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).send(tasks);
  } catch (err) {
    res.status(404).send({ msg: "404 error" });
  }
});

tasksRouter.post("/add", async (req, res) => {
    const payload=req.body;
  try {
    const tasks = new TaskModel(payload);
    await tasks.save();
    res.status(200).send({"msg":"Task Added"});
  } catch (err) {
    res.status(404).send({ msg: "404 error" });
  }
});

tasksRouter.patch("/:id", async (req, res) => {
    const id=req.params.id;
    const payload=req.body;
  try {
    await TaskModel.findByIdAndUpdate({_id:id},payload)
    res.status(200).send({"msg":"Task updated"});
  } catch (err) {
    res.status(404).send({ msg: "404 error" });
  }
});

module.exports = {
  tasksRouter,
};
