const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

	console.log("masuk requireAuth")

    if (!authorization) {
        return res.status(401).json({
            status: "Fail",
            message: "Authorization token required",
        });
    }

    const token = authorization.split(" ")[1];

	console.log("token: " + token);

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        req.user = await User.findOne({ _id }).select("_id");
        next();
    } catch (error) {
		console.log(error);
        res.status(401).json({
            status: "Fail",
            message: error.message,
        });
    }
};

module.exports = requireAuth;
