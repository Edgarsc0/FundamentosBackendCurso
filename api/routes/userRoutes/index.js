const express = require("express");
const userModel = require("../../models/user/model");
const boom = require('@hapi/boom');
const userSchema = require("../../models/user/schema");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    const data = await userModel.getAllUsers();
    res.status(200).json({
        data
    });
});

userRouter.post("/", async (req, res) => {
    const newUser = new userSchema(req.body);
    newUser.save().then((user) => {
        res.status(200).json({
            user
        });
    }).catch((error) => {
        res.status(200).json({
            error
        });
    });
});

userRouter.patch("/", async (req, res) => {
    const modifiedUser = await userModel.updateUser(req.body._id, req.body.newInfo);
    res.status(200).json({
        modifiedUser
    });
});

userRouter.get("/:userName", async (req, res) => {
    const { userName } = req.params;
    const userInfo = await userModel.findUserByUserName(userName);
    res.status(200).json({
        userInfo
    });
});

userRouter.delete("/:userId", async (req, res) => {
    const { userId } = req.params;
    const deletedUser=await userModel.deleteUser(userId);
    res.status(200).json({
        deletedUser
    });
});

module.exports = userRouter;