const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });

    res.status(200).json(workouts);

    // res.status(200).json({
    //     status: "success",
    //     data: {
    //         workouts,
    //     },
    // });
};

// get a single workout
const getWorkout = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({
            status: "fail",
            error: "Invalid workout ID",
        });
    }

    const workout = await Workout.findById(req.params.id);

    if (!workout) {
        return res.status(404).json({
            message: "fail",
            error: "No such workout",
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            workout,
        },
    });
};

// create a new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push("title");
    }

    if (!load) {
        emptyFields.push("load");
    }

    if (!reps) {
        emptyFields.push("reps");
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({
            error: "Please fill in all the fields",
            emptyFields,
        });
    }

    try {
        const workout = await Workout.create({ title, reps, load });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

// delete a workout
const deleteWorkout = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({
            status: "fail",
            error: "Invalid workout ID",
        });
    }

    const workout = await Workout.findOneAndDelete({ _id: req.params.id });

    if (!workout) {
        return res.status(404).json({
            status: "fail",
            message: "No such workout",
        });
    }

    res.status(200).json({
        status: "success",
        message: "Workout successfully deleted",
        data: {
            workout,
        },
    });
};

// update a workout
const updateWorkout = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({
            status: "fail",
            error: "Invalid workout ID",
        });
    }

    const workout = await Workout.findByIdAndUpdate(
        req.params.id,
        {
            ...req.body,
        },
        { new: true }
    );

    if (!workout) {
        return res.status(404).json({
            status: "fail",
            message: "No such workout",
        });
    }

    res.status(200).json({
        status: "success",
        message: "Workout successfully updated",
        data: {
            workout,
        },
    });
};

module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
};
