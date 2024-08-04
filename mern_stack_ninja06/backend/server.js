require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/userRoutes");

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
		console.log("Successfully connected to db")

        // listen for request
        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`Listening on port ${port}!!`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
