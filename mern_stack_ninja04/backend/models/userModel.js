const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
});

userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw new Error("All fields must be filled");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Please enter valid email");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter stronger password");
    }

    const user = await this.findOne({ email });

    if (user) {
        throw new Error("User with this email is already exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await this.create({ email, password: hashedPassword });

	return newUser;
};

userSchema.statics.login = async function(email, password) {
	if (!email || !password) {
		throw new Error("All fields must be filled");
	}

	if (!validator.isEmail(email)) {
		throw new Error("Please enter a valid email");
	}

	const user = await this.findOne({email});

	if (!user) {
		throw new Error("User with this email is not exist");
	}

	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		throw new Error("Incorrect password");
	}

	return user;
}

module.exports = mongoose.model("User", userSchema);
