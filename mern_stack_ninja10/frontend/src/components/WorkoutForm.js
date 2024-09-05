import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

function WorkoutForm() {
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);
    const { dispatch } = useWorkoutContext();
    const [emptyFields, setEmptyFields] = useState([]);
    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError("You must be logged in to proceed");
            return;
        }

        const response = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify({ title, load, reps }),
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`,
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.message);
            setEmptyFields(json.data);
        }

        if (response.ok) {
            dispatch({ type: "CREATE_WORKOUT", payload: json.data });
            setTitle("");
            setLoad("");
            setReps("");
            setError(null);
            setEmptyFields([]);
            console.log("New workout added!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4>Add a New Workout</h4>

            <label>Title: </label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title") ? "error" : ""}
            />

            <label>Load (kg): </label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes("load") ? "error" : ""}
            />

            <label>Reps: </label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes("reps") ? "error" : ""}
            />

            <button>Add Workout</button>

            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default WorkoutForm;
