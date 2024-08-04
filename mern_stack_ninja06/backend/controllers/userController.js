const User = require("../models/userModel");

// login user
const loginUser = async (req, res) => {
    res.status(200).json({
        message: "Login user",
    });
};

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);

        res.status(200).json({
            status: "Success",
            email,
            user,
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message,
        });
    }
};

module.exports = { signupUser, loginUser };
