import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkoutContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: workoutDispatch } = useWorkoutContext();

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem("user");

        // update auth context
        dispatch({ type: "LOGOUT" });
        workoutDispatch({ type: "SET_WORKOUTS", payload: null });
    };

    return { logout };
};
