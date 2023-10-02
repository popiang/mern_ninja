const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const workoutRoutes = require("./routes/workoutRoutes");

const app = express();

dotenv.config({ path: "./config.env" });

app.use(bodyParser.json());

app.use("/api/workouts", workoutRoutes);

mongoose.connect(process.env.DATABASE).then(() => {
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Listining to port ${port}...`);
        console.log(`Database is connected...`);
    });
});
