require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workoutRoutes");
const mongoose = require("mongoose");

const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use("/api/workouts", workoutRoutes);

mongoose.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("Successfully connected to db")
		const port = process.env.PORT;
		app.listen(port, () => {
			console.log("Listening to port " + port);
		});
	}).catch(error => {
		console.log(error.message)
	});

