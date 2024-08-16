require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRouter = require("./routes/workoutRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// middlewares
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

// routes
app.use("/api/workouts", workoutRouter);
app.use("/api/users", userRouter);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Successfully connected to db");
        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`Listening to port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });
