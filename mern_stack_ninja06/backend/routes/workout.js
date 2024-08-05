const express = require("express");
const {
    createWorkout,
    getWorkouts,
    getAWorkout,
    deleteAWorkout,
    updateAWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

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
