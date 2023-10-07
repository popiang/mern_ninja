const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

dotenv.config({ path: "./config.env" });

const app = express();

// middleware
app.use(bodyParser.json());

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database...");
        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`Listening on port ${port}...`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });
