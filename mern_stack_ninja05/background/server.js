const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const workoutRouter = require("./routes/workoutRoutes");

const app = express();

app.use(bodyParser.json());

dotenv.config({ path: "./config.env" });

app.use("/api/workouts", workoutRouter);

mongoose.connect(process.env.DATABASE).then(() => {
    console.log(`Connected to database...`);
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Listening to port ${port}`);
    });
});
