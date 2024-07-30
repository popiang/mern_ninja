import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

function Home() {
    const { workouts, dispatch } = useWorkoutContext();

    useEffect(() => {
        try {
            const fetchWorkout = async () => {
                const response = await fetch("/api/workouts", {
                    method: "GET",
                    redirect: "follow",
                });
                const json = await response.json();
                console.log(json.data.workouts);
                if (response.ok) {
                    dispatch({
                        type: "SET_WORKOUTS",
                        payload: json.data.workouts,
                    });
                }
            };
            fetchWorkout();
        } catch (error) {
            console.log("masuk error");
            console.log(error.message);
        }
    }, [dispatch]);

    return (
        <div className="home">
            <div className="workouts">
                {workouts &&
                    workouts.map((workout) => (
                        <WorkoutDetails key={workout._id} workout={workout} />
                    ))}
            </div>
            <WorkoutForm />
        </div>
    );
}

export default Home;
