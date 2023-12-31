const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(bodyParser.json());

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to database...");
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Listening to port ${port}...`);
    });
});
