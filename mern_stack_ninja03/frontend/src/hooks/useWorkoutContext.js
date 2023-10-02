import { useContext } from "react";
import { WorkoutContext } from "../context/workoutContext";

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext);

    if (!context) {
        return new Error(
            "useWorkoutContext must be inside WorkoutContextProvider"
        );
    }

    return context;
};
