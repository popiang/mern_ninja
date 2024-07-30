require("dotenv").config();
const express = require("express");

const workoutRoutes = require("./routes/workoutRoute");

const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
	next();
});

// routes
app.use("/api/workouts", workoutRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log("Listening to port 4000..");
});
