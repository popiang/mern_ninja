import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

function Home() {
    const { workouts, dispatch } = useWorkoutContext();
    const { user } = useAuthContext();

    useEffect(() => {
        try {
            const fetchWorkout = async () => {
                const response = await fetch("/api/workouts", {
                    method: "GET",
                    redirect: "follow",
                    headers: {
                        authorization: `Bearer ${user.token}`,
                    },
                });
                const json = await response.json();
                if (response.ok) {
                    dispatch({
                        type: "SET_WORKOUTS",
                        payload: json.data.workouts,
                    });
                }
            };
            if (user) {
                fetchWorkout();
            }
        } catch (error) {
            console.log(error.message);
        }
    }, [dispatch, user]);

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
