const mongoose = require("mongoose");
const validator = require("validator");
const bcyrpt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.statics.signup = async function (email, password) {
    //? validate email & password
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough");
    }

    //? check if email is already used
    const exist = await this.findOne({ email });

    if (exist) {
        throw Error("Email already in use");
    }

    //? hash the password
    const salt = await bcyrpt.genSalt(10);
    const hash = await bcyrpt.hash(password, salt);

    //? create user
    const user = await this.create({ email, password: hash });

    return user;
};

userSchema.statics.login = async function (email, password) {
    //? validate email & password
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    //? find user by email
    const user = await this.findOne({ email });

    if (!user) {
        throw Error("Incorrect email");
    }

	//? check password
    const match = await bcyrpt.compare(password, user.password);

    if (!match) {
        throw Error("Incorrect password");
    }

    return user;
};

module.exports = mongoose.model("User", userSchema);
