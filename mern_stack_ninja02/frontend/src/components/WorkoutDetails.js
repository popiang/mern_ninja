import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

export default function WorkoutDetails({ workout }) {
    const { dispatch } = useWorkoutContext();

    const handleClick = async () => {
        const response = await fetch("/api/workouts/" + workout._id, {
            method: "DELETE",
        });

        const json = await response.json();

		console.log(json);

        if (response.ok) {
            dispatch({ type: "DELETE_WORKOUT", payload: json.data.deletedWorkout });
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
                    addSuffic: true,
                })}
            </p>
            <span className="material-symbols-outlined" onClick={handleClick}>
                delete
            </span>
        </div>
    );
}
