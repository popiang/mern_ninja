const express = require("express");
const workoutControllers = require("../controllers/workoutControllers");

const router = express.Router();

router
    .route("/")
    .get(workoutControllers.getAllWorkouts)
    .post(workoutControllers.createWorkout);
router
    .route("/:id")
    .get(workoutControllers.getWorkout)
    .delete(workoutControllers.deleteWorkout)
    .patch(workoutControllers.updateWorkout);

module.exports = router;
