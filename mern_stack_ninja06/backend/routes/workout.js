const express = require("express");
const {
    createWorkout,
    getWorkouts,
    getAWorkout,
    deleteAWorkout,
    updateAWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

// GET all workouts
router.get("/", getWorkouts);

// GET a single workout
router.get("/:id", getAWorkout);

// POST  a new workout
router.post("/", createWorkout);

// PATCH a workout
router.patch("/:id", updateAWorkout);

// DELETE a workout
router.delete("/:id", deleteAWorkout);

module.exports = router;
