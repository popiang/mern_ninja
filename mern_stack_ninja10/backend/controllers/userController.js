const login = (req, res) => {
    res.status(200).json({
        message: "Login",
    });
};

const signup = (req, res) => {
    res.status(200).json({
        message: "Signup",
    });
};

module.exports = { login, signup };
