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
        user_id: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
