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
        throw Error("Please fill in all fields");
    }

    if (!validator.isEmail(email)) {
        throw Error("Invalid email address");
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough");
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error("Email has already been used");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hashedPassword });

    return user;
};

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("Please fill in all fields");
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error("No such user");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error("Incorrect email or password");
    }

    return user;
};

module.exports = mongoose.model("User", userSchema);
