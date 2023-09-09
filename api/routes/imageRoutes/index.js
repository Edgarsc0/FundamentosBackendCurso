const express = require("express");
const imageModel = require("../../models/image/model");
const boom = require("@hapi/boom");
const userSchema = require("../../models/image/schema");

const imageRouter = express.Router();

imageRouter.post("/", async (req, res) => {
    const response = await imageModel.updateRegister(req.body);
    console.log(response);
    res.status(200).json({ response });
});

imageRouter.get("/",async(req,res)=>{
    const response=awa
});

imageRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const response= await imageModel.getBase64(id);
    res.status(200).json(response);
});

module.exports = imageRouter;