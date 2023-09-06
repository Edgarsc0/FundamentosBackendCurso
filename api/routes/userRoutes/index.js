const express = require("express");
const connection = require("../../db");
const User = require("../../models/user/schema");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    connection();
    const allUsers = await User.aggregate([
        {
            $match: { student: "Edgar" }
        },
        {
            $lookup: {
                from: "tabla1",
                localField: "school",
                foreignField: "_id",
                as: "school_info"
            }
        },
        {
            $unwind: "$school_info"
        },
        {
            $project: {
                _id: 0,
                student: 1,
                age: 1,
                "school_info.name": 1,
                "school_info.type": 1,
                "school_info.level": 1
            }
        }
    ]);
    res.status(200).json({
        allUsers
    });
});

module.exports = userRouter;