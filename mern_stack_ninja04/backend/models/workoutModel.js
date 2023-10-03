const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "A workout requires a title"],
        },
        load: {
            type: Number,
            requied: [true, "A workout requires a load"],
        },
        reps: {
            type: Number,
            required: [true, "A workout requires reps"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
