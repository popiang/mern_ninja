const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "A workout title is required"],
        },
        reps: {
            type: Number,
            required: [true, "A workout reps is required"],
        },
        load: {
            type: Number,
            required: [true, "A workout load is required"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);

