const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const {
    getAllWorkouts,
    getWorkout,
    createWorkout,
	deleteWorkout,
	updateWorkout
} = require("../controllers/workoutController");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

router.get("/", getAllWorkouts);
router.get("/:id", getWorkout);
router.post("/", createWorkout);
router.delete("/:id", deleteWorkout);
router.patch("/:id", updateWorkout);

module.exports = router;
