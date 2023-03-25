const express = require("express");
const { SprintModel } = require("../model/Sprint.model");
const sprintsRouter = express.Router();

sprintsRouter.get("/", async (req, res) => {
  try {
    const sprints = await SprintModel.find();
    res.status(200).send(sprints);
  } catch (err) {
    res.status(404).send({ msg: "404 error" });
  }
});

sprintsRouter.post("/", async (req, res) => {
  const body = req.body;
  try {
    const sprints = new SprintModel(body);
    await sprints.save();
    res.status(200).send({ msg: "Sprint Added" });
  } catch (err) {
    res.status(404).send({ msg: "404 error" });
  }
});

sprintsRouter.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    console.log(tasks)
    const sprint=await SprintModel.find({_id:id});
    await SprintModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).send({ msg: "updated" });
  } catch (err) {
    res.status(404).send({ msg: "404 error" });
  }
});

sprintsRouter.delete("/:id", async (req, res) => {
  const body = req.params.id;
  try {
    await SprintModel.findByIdAndDelete({ _id: body });
    res.status(200).send({ msg: "sprint deleted" });
  } catch (err) {
    res.status(404).send({ msg: "404 error" });
  }
});

module.exports = {
  sprintsRouter,
};
