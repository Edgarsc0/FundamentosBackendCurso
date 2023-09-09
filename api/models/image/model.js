const { default: mongoose, mongo } = require("mongoose");
const connection = require("../../db");
const imageSchema = require("./schema");
class Image {
    constructor() {
        connection();
    }

    async getBase64(id) {
        const base64 = await imageSchema.find({ idOwner: id });
        return base64.map(item=>item.currentString)
    }

    async getImages(){
        return await imageSchema.find();
    }

    async updateRegister(requestData) {
        try {
            const { id, partialString, requestNumber, totalRequest, autor } = requestData;

            await new imageSchema({
                idOwner: id,
                currentString: partialString,
                autor: autor
            }).save();

            let statusMessage;

            if (requestNumber === totalRequest) {
                statusMessage = `Ultimo paquete recibido ${requestNumber}/${totalRequest}`;
                return {
                    status: statusMessage,
                    url: `http://localhost:8080/api/v0/instaClone/image/${id}`
                };
            } else {
                statusMessage = `Paquete recibido ${requestNumber}/${totalRequest}`;
                return {
                    status: statusMessage,
                };
            }


        } catch (err) {
            return {
                status: 'Error',
                err
            };
        }
    }

}

module.exports = new Image();