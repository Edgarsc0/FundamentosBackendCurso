const { default: mongoose, mongo } = require("mongoose");
const connection = require("../../db");
const userSchema = require("./schema");

class User {
    constructor() {
        connection();
    }

    async getAllUsers() {
        const allUsers = await userSchema.find();
        return allUsers;
    }

    async updateUser(userId, newInfo) {
        const modifiedUser = await userSchema.updateOne({
            _id: new mongoose.Types.ObjectId(userId)
        }, {
            $set: newInfo
        });
        return modifiedUser;
    }

    async findUserByUserName(userName) {
        const user = await userSchema.findOne({ username: userName });
        return user;
    }

    async deleteUser(userId) {
        const deletedUser = await userSchema.deleteOne(new mongoose.Types.ObjectId(userId));
        return deletedUser;
    }
}

module.exports = new User();