const express = require("express");
const workoutControllers = require("../controllers/workoutControllers");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.use(requireAuth);

router
    .route("/")
    .get(workoutControllers.getAllWorkouts)
    .post(workoutControllers.createWorkout);

router
    .route("/:id")
    .get(workoutControllers.getWorkout)
    .delete(workoutControllers.deleteWorkout)
    .patch(workoutControllers.udpateWorkout);

module.exports = router;
