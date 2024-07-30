const express =require("express");

const router = express.Router();

router.get("/", (req, res) => {
	console.log("masuk get all workouts!!");
	res.status(200).json({
		status: "Success",
		message: "Get all workouts"
	})
});

router.get("/:id", (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Get a single workout",
    });
});

router.post("/", (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Create a workout",
    });
});

router.patch("/:id", (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Update a workout",
    });
});

router.delete("/:id", (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Delete a workout",
    });
});

module.exports = router;