import { useWorkoutContext } from "../hooks/useWorkoutContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function WorkoutDetails({ workout }) {
    const { dispatch } = useWorkoutContext();

    const handleClick = async () => {
        const response = await fetch("/api/workouts/" + workout._id, {
            method: "DELETE",
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
