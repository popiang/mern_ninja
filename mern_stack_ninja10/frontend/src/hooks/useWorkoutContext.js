import { useContext } from "react";
import { WorkoutContext } from "../contexts/WorkoutContext";

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext);

    if (!context) {
        throw new Error(
            "useWorkoutContext must be inside WorkoutContextProvider"
        );
    }

    return context;
};
