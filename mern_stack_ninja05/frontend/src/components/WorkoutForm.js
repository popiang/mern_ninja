import { useState } from "react";

export default function WorkoutForm() {
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

		console.log(response);

        if (response.ok) {
            setTitle("");
            setLoad("");
            setReps("");
            setError(null);
        } else {
            setError(error.message);
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add A New Workout</h3>
            <label>Exercise Title: </label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label>Load (in kg):</label>
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
            <button className="btn">Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}
