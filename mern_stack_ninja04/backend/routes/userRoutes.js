const express = require("express");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.route("/signup").post(userControllers.signup);
router.route("/login").post(userControllers.login);

module.exports = router;
