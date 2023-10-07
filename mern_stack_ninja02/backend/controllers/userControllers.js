const User = require("../models/useModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

exports.signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        //? signup user
        const user = await User.signup(email, password);

        //? create token
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

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        //? login user
        const user = await User.login(email, password);

        //? create token
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
