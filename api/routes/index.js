const express = require("express");
const userRouter = require("./userRoutes");
const imageRouter = require("./imageRoutes");

const mainRouter = express.Router();

const mainRouting = app => {
    app.use("/api/v0/instaClone", mainRouter);
    mainRouter.use("/users", userRouter);
    mainRouter.use("/image", imageRouter);
}


module.exports = mainRouting;