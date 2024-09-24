const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutShema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Workout title is required"],
        },
        load: {
            type: Number,
            required: [true, "Workout load is required"],
        },
        reps: {
            type: Number,
            required: [true, "Workout reps is required"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Workout", workoutShema);
