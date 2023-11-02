const express = require("express");
const workoutControllers = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

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