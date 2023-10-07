import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function WorkoutDetails({ workout }) {
    const { dispatch } = useWorkoutContext();
    const { user } = useAuthContext();

    const handleClick = async () => {
        if (!user) {
            return;
        }

        const response = await fetch("/api/workouts/" + workout._id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        const json = await response.json();

        if (response.ok) {
            console.log(json.data.workout);
            dispatch({ type: "DELETE_WORKOUT", payload: json.data.workout });
        }
    };

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p>
                <strong>Load (kg): </strong>
                {workout.load}
            </p>
            <p>
                <strong>Reps: </strong>
                {workout.reps}
            </p>
            <p>
                {formatDistanceToNow(new Date(workout.createdAt), {
                    addSuffix: true,
                })}
            </p>
            <span className="material-symbols-outlined" onClick={handleClick}>
                delete
            </span>
        </div>
    );
}
