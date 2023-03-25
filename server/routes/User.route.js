const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/User.model");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    try {
      const users = await UserModel.find();
      res.status(200).send(users);
    } catch (err) {
      res.status(404).send({ msg: "404 error" });
    }
  });

userRouter.post("/", async (req, res) => {
    const {data}=req.body;

    try {
      const email = data.email;
      const user = await UserModel.find({ email });
      if (user.length > 0) {
        const users = await UserModel.findByIdAndUpdate(
          { _id: user[0]._id },
          {
            username: data.name,
            avatar: data.picture,
          }
        );
  
        const token = jwt.sign({ course: "backend" }, process.env.secret);
        console.log(token)
        res.status(200).send({
          msg: "logged in",
          token: token,
          username: user[0].username,
          avatar: user[0].avatar,
          id: user[0]._id,
        });
      } else {
        const newuser = new UserModel({
          username: data.name,
          email: data.email,
          avatar: data.picture,
        });
        await newuser.save();
        const token = jwt.sign({ course: "backend" }, process.env.secret);
        res.status(200).send({
          msg: "logged in",
          token: token,
          username: user[0].username,
          avatar: user[0].avatar,
          id: user[0]._id,
        });
      }
    } catch (err) {
      res.status(404).send({ msg: "404 error" });
    }
  });


  module.exports={
    userRouter
  }