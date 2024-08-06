const User = require("../models/userModel");

const login = (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Login user",
    });
};

const signup = (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Signup user",
    });
};

module.exports = { login, signup };
