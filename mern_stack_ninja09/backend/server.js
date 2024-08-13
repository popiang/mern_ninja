require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const workoutRoutes = require("./routes/workoutRoute");
const userRoutes = require("./routes/userRoute");

const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Successfully connected to db..");
        const port = process.env.PORT;
        app.listen(port, () => {
            console.log("Listening to port 4000..");
        });
    })
    .catch((error) => {
        console.log(error.message);
    });
