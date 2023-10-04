const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Workout requires a title"],
        },
        load: {
            type: Number,
            required: [true, "Workout requires a load"],
        },
        reps: {
            type: Number,
            required: [true, "Workout requires reps"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
