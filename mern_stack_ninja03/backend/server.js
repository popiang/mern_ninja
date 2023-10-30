const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

dotenv.config({ path: "./config.env" });

app.use(bodyParser.json());

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose.connect(process.env.DATABASE).then(() => {
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Listining to port ${port}...`);
        console.log(`Database is connected...`);
    });
});
