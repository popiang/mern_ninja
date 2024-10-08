const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw new Error("All fields are required");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Email is invalid");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw new Error("Email has already been used");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hash });

    return user;
};

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw new Error("All fields are required");
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw new Error("User cannot be found");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error("Incorrect email or password");
    }

    return user;
};

module.exports = mongoose.model("User", userSchema);
