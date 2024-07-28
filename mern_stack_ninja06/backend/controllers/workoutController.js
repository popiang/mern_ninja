const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            status: "Success",
            results: workouts.length,
            data: {
                workouts,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message,
        });
    }
};

// get a single workout
const getAWorkout = async (req, res) => {
    const workoutId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
        return res.status(404).json({
            status: "Fail",
            message: "Invalid workout ID",
        });
    }

    try {
        const workout = await Workout.findById(workoutId);

        if (!workout) {
            throw new Error("No such workout!");
        }

        res.status(200).json({
            status: "Success",
            data: workout,
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message,
        });
    }
};

// create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    let emptyFields = [];

    if (!title) emptyFields.push("title");
    if (!load) emptyFields.push("load");
    if (!reps) emptyFields.push("reps");

    if (emptyFields.length > 0) {
        return res.status(400).json({
            status: "Fail",
            message: "Please fill in all the fields",
            data: emptyFields,
        });
    }

    try {
        const workout = await Workout.create({ title, load, reps });
        res.status(200).json({
            status: "Success",
            data: workout,
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message,
        });
    }
};

// delete a workout
const deleteAWorkout = async (req, res) => {
    const workoutId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
        return res.status(404).json({
            status: "Fail",
            message: "Invalid workout ID",
        });
    }

    try {
        // const deletedWorkout = await Workout.findByIdAndDelete(workoutId);
        const deletedWorkout = await Workout.findOneAndDelete({
            _id: workoutId,
        });

        console.log("Deleted workout: ", deleteAWorkout);

        if (!deletedWorkout) {
            return res.status(404).json({
                status: "Fail",
                message: "No such workout",
            });
        }

        res.status(200).json({
            status: "Delete success",
            data: workoutId,
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message,
        });
    }
};

// update a workout
const updateAWorkout = async (req, res) => {
    const workoutId = req.params.id;
    const { title, load, reps } = req.body;

    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
        return res.status(404).json({
            status: "Fail",
            message: "Invalid workout ID",
        });
    }

    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, {
            title,
            load,
            reps,
        });

        if (!updatedWorkout) {
            return res.status(404).json({
                status: "Fail",
                message: "No such workout",
            });
        }

        res.status(200).json({
            status: "Success",
            data: updatedWorkout,
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message,
        });
    }
};

module.exports = {
    createWorkout,
    getWorkouts,
    getAWorkout,
    deleteAWorkout,
    updateAWorkout,
};
