import { useState, useEffect } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";

function Home() {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        try {
            const fetchWorkout = async () => {
                const response = await fetch("/api/workouts", {
                    method: "GET",
                    redirect: "follow",
                });
                const json = await response.json();
                if (response.ok) {
                    setWorkouts(json.data);
                }
            };
            fetchWorkout();
        } catch (error) {
            console.log("masuk error");
            console.log(error.message);
        }
    }, []);

    return (
        <div className="home">
            <div className="workouts">
                {workouts &&
                    workouts.map((workout) => (
                        <WorkoutDetails key={workout._id} workout={workout} />
                    ))}
            </div>
        </div>
    );
}

export default Home;
