import { useContext } from "react";
import { WorkoutContext } from "../contexts/WorkoutContext";

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext);

    if (!context) {
        throw new Error(
            "useWorkoutContext should be inside WorkoutContextProvider"
        );
    }

    return context;
};
