const User = require("../models/userModel");

exports.signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);

        res.status(200).json({
            status: "Success",
            user: user,
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message,
        });
    }
};

exports.login = (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Login user",
    });
};
