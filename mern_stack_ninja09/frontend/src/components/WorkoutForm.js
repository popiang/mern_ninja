import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

function WorkoutForm() {
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const { dispatch } = useWorkoutContext();
    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        if (!user) {
            setError("You need to be logged in to add workout");
            return;
        }

        e.preventDefault();

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
            setTitle("");
            setLoad("");
            setReps("");
            setError(null);
            setEmptyFields([]);
            console.log("New workout added");
            dispatch({ type: "CREATE_WORKOUT", payload: json.data });
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
                type="text"
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
