const mongoose = require("mongoose");

const Schema = new mongoose.Schema();

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
		unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
});

module.exports = mongoose.model("User", userSchema);