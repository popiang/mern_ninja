import { useEffect } from "react";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

function Home() {
    const { workouts, dispatch } = useWorkoutContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch("/api/workouts", {
                headers: {
                    authorization: `Bearer ${user.token}`,
                },
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_WORKOUTS", payload: json.data });
            }
        };

        if (user) {
            fetchWorkouts();
        }
    }, [dispatch, user]);

    return (
        <div className="home">
            <div className="workouts">
                {workouts &&
                    workouts.map((workout) => (
                        <WorkoutDetails workout={workout} key={workout._id} />
                    ))}
            </div>
            <WorkoutForm />
        </div>
    );
}

export default Home;
