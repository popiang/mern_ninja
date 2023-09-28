const { default: mongoose } = require("mongoose");
const Workout = require("../models/workoutModel");

exports.getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find().sort({ createdAt: -1 });

    res.status(200).json({
        status: "success",
        data: {
            workouts,
        },
    });
};

exports.getWorkout = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: "Fail",
            message: "Invalid workout ID",
        });
    }

    const workout = await Workout.findById(req.params.id);

    if (!workout) {
        return res.status(404).json({
            status: "Fail",
            message: "No such workout",
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            workout,
        },
    });
};

exports.createWorkout = async (req, res) => {
    try {
        const workout = await Workout.create(req.body);

        res.status(200).json({
            status: "success",
            data: {
                workout,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message,
        });
    }
};

exports.deleteWorkout = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: "Fail",
            message: "Invalid workout ID",
        });
    }

    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);

    console.log(deletedWorkout);

    if (!deletedWorkout) {
        return res.status(400).json({
            status: "Fail",
            message: "No such workout",
        });
    }

    res.status(204).json({
        status: "success",
        message: "workout deleted",
        data: {
            deletedWorkout,
        },
    });
};

exports.udpateWorkout = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: "Fail",
            message: "Invalid workout ID",
        });
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(
        req.params.id,
        req.body
    );

    if (!updatedWorkout) {
        return res.status(400).json({
            status: "Fail",
            message: "No such workout",
        });
    }

    res.status(200).json({
        status: "success",
        message: "workout updated",
        data: {
            updatedWorkout,
        },
    });
};
