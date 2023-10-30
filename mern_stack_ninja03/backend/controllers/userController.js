exports.signup = (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Signup user",
    });
};

exports.login = (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Loginuser",
    });
};
