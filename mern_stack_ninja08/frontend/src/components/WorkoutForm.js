import { useState } from "react";

function WorkoutForm() {
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);

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
        }

        if (response.ok) {
            setTitle("");
            setLoad("");
            setReps("");
            setError(null);
            console.log("New workout added!!");
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
            />

            <label>Load (kg): </label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />

            <label>Reps: </label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />

            <button>Add Workout</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
}

export default WorkoutForm;
