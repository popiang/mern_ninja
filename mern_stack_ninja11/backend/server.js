const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const workoutRouter = require("./routes/workoutRoutes");

const app = express();

app.use(express.json());

app.use("/api/workouts", workoutRouter);

mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        console.log("Successfully connected to database");

        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`Listening to port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });
	