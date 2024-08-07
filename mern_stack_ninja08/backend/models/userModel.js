const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        console.log("masuk");
        throw Error("Email and password are required");
    }

    if (!validator.isEmail(email)) {
        throw Error("Invalid email address");
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough");
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error("User with this email is already exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hash });

    return user;
};

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        console.log("masuk");
        throw Error("Email and password are required");
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error("No such user with the email address");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error("Invalid username or password");
    }

    return user;
};

module.exports = mongoose.model("User", userSchema);
