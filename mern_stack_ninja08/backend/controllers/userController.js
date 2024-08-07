const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3D" });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);

        res.status(200).json({
            status: "Success",
            email,
            token,
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message,
        });
    }
};

const signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);

        const token = createToken(user._id);

        res.status(200).json({
            status: "Success",
            email,
            token,
        });
    } catch (error) {
        console.log("error is catched!!");
        res.status(400).json({
            status: "Fail",
            message: error.message,
        });
    }
};

module.exports = { login, signup };
