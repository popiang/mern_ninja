const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "A workout requires a title"],
        },
        reps: {
            type: Number,
            required: [true, "A workout requires reps"],
        },
        load: {
            type: Number,
            required: [true, "A workout requires a load"],
        },
        user_id: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
