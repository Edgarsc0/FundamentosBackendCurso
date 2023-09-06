const express=require("express");
const userRouter=require("./userRoutes");

const mainRouter = express.Router();

const mainRouting = app => {
    app.use("/api/v0/instaClone",mainRouter);
    mainRouter.use("/users",userRouter);
}


module.exports=mainRouting;