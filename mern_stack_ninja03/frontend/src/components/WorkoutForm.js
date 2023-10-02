import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

export default function WorkoutForm() {
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);
	const [emptyFields, setEmptyFields] = useState([]);
    const { dispatch } = useWorkoutContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = { title, load, reps };

        const response = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.message);
			setEmptyFields(json.data.emptyFields);
        } else {
            setTitle("");
            setLoad("");
            setReps("");
            setError(null);
			setEmptyFields([]);
			dispatch({type: "CREATE_WORKOUT", payload: json.data.workout})
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h4>Add A New Workout</h4>
            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title") ? "error" : ""}
            />

            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes("load") ? "error" : ""}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes("reps") ? "error" : ""}
            />

            <button className="btn">Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}
