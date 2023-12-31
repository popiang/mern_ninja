const express = require("express");
const workoutRoutes = require("./routes/workoutRoutes");
const useRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

dotenv.config({ path: "./config.env" });

app.use(bodyParser.json());

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", useRoutes);

mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Successfully connected to database...");
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Listening to port ${port}...`);
    });
});
