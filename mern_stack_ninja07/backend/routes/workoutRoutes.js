const express = require("express");
const workoutController = require("../controllers/workoutController");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", workoutController.getAllWorkouts);

router.get("/:id", workoutController.getWorkout);

router.post("/", workoutController.createWorkout);

router.patch("/:id", workoutController.updateWorkout);

router.delete("/:id", workoutController.deleteWorkout);

module.exports = router;
