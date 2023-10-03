const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

exports.getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find().sort({ createdAt: -1 });

    res.status(200).json({
        status: "Success",
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
        return res.status(400).json({
            status: "Fail",
            message: "No such workout",
        });
    }

    res.status(200).json({
        status: "Success",
        data: {
            workout,
        },
    });
};

exports.createWorkout = async (req, res) => {
    let emptyFields = [];

    if (!req.body.title) {
        emptyFields.push("title");
    }

    if (!req.body.load) {
        emptyFields.push("load");
    }

    if (!req.body.reps) {
        emptyFields.push("reps");
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({
            status: "Fail",
            message: "Please fill in the required fields",
            data: {
                emptyFields,
            },
        });
    }

    const workout = await Workout.create(req.body);

    if (!workout) {
        return res.status(400).json({
            status: "Fail",
            message: "Workout failed to be created",
        });
    }

    res.status(200).json({
        status: "Success",
        data: {
            workout,
        },
    });
};

exports.deleteWorkout = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: "Fail",
            message: "Invalid workout ID",
        });
    }

    const workout = await Workout.findByIdAndDelete(req.params.id);

    if (!workout) {
        return res.status(400).json({
            status: "Fail",
            message: "No such workout",
        });
    }

    res.status(200).json({
        status: "Success",
        data: {
            workout,
        },
    });
};

exports.updateWorkout = (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Update a workout",
    });
};
