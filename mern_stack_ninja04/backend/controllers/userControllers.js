const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const createToken = (_id) => {
    return jwt.sign({ _id: _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

exports.signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);
        const token = createToken(user._id);

        res.status(200).json({
            email: user.email,
            token: token,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

exports.login = async (req, res) => {
	const {email, password} = req.body;

	try {
		const user = await User.login(email, password);
		const token = createToken(user._id);

		res.status(200).json({
            email: user.email,
            token: token,
        });
		
	} catch (error) {
		res.status(200).json({
			error: error.message
		});
	}
};
