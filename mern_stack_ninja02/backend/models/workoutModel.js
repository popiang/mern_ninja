const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "A workout need a title"],
        },
        load: {
            type: Number,
            required: [true, "A workout need a load"],
        },
        reps: {
            type: Number,
            required: [true, "A workout need a repsa"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
