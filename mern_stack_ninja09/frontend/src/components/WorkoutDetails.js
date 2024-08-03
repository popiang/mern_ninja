import { useWorkoutContext } from "../hooks/useWorkoutContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function WorkoutDetails({ workout }) {
    const { dispatch } = useWorkoutContext();

    const handleDelete = async () => {
        const response = await fetch("/api/workouts/" + workout._id, {
            method: "DELETE",
        });

        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "DELETE_WORKOUT", payload: json.data });
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
                <strong>Reps:</strong>
                {workout.reps}
            </p>
            <p>{formatDistanceToNow(workout.createdAt, { addSuffix: true })}</p>
            <span onClick={handleDelete} className="material-symbols-outlined">
                delete
            </span>
        </div>
    );
}

export default WorkoutDetails;
