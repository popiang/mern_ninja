const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

const getAllWorkouts = async (req, res) => {
    try {
        const user_id = req.user._id;
        const workouts = await Workout.find({ user_id }).sort({ _id: -1 });

        res.status(200).json({
            status: "Success",
            data: workouts,
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message,
        });
    }
};

const getWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Fail",
            message: "Invalid workout ID",
        });
    }

    try {
        const workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({
                status: "Fail",
                message: "No such workout",
            });
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

const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;
    let emptyFields = [];

    if (!title) emptyFields.push("title");
    if (!load) emptyFields.push("load");
    if (!reps) emptyFields.push("reps");

    if (emptyFields.length > 0) {
        return res.status(400).json({
            status: "Fail",
            message: "Please fill in all fields",
            data: emptyFields,
        });
    }

    try {
        const user_id = req.user._id;
        const workout = await Workout.create({ user_id, ...req.body });

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

const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Fail",
            message: "Invalid workout ID",
        });
    }

    try {
        const workout = await Workout.findByIdAndUpdate(id, { ...req.body });

        if (!workout) {
            return res.status(404).json({
                status: "Fail",
                message: "No such workout",
            });
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

const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Fail",
            message: "Invalid workout ID",
        });
    }

    try {
        const workout = await Workout.findByIdAndDelete(id);

        if (!workout) {
            return res.status(404).json({
                status: "Fail",
                message: "No such workout",
            });
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

module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
};
