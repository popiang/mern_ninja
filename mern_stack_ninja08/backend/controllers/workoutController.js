const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

const getAllWorkouts = async (req, res) => {
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
    try {
        const workout = await Workout.create({ ...req.body });

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
        const deletedWorkout = await Workout.findByIdAndDelete(id);

        if (!deletedWorkout) {
            return res.status(404).json({
                status: "Fail",
                message: "No such workout",
            });
        }

        res.status(200).json({
            status: "Success",
            data: deletedWorkout,
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
