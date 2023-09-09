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

imageRouter.get("/", async (req, res) => {
    const response = await imageModel.getImages();
    res.status(200).json({ response })
});

imageRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    console.time("Empieza consulta");
    const response = await imageModel.getBase64(id);
    console.time("Empieza consulta");
    let base64="";
    response.base64.map(item=>base64+=(item.currentString));
    res.setHeader('Content-Type', 'image/jpeg');
    const imageBuffer=Buffer.from(base64,"base64");
    res.end(imageBuffer);
});

module.exports = imageRouter;