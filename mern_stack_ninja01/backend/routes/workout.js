const express = require("express");

const {
    getAllWorkouts,
    getWorkout,
    createWorkout,
	deleteWorkout,
	updateWorkout
} = require("../controllers/workoutController");

const router = express.Router();

router.get("/", getAllWorkouts);
router.get("/:id", getWorkout);
router.post("/", createWorkout);
router.delete("/:id", deleteWorkout);
router.patch("/:id", updateWorkout);

module.exports = router;
