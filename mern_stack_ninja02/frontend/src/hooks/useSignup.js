import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setError(null);
        setIsLoading(true);

        const response = await fetch("/api/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.message);
            setIsLoading(false);
        }

        if (response.ok) {
			//? save the user to local storage
			localStorage.setItem("user", JSON.stringify(json));

			//? update auth context
			dispatch({ type: "LOGIN", payload: json });

            setIsLoading(false);
            setError(null);
        }
    };

    return { signup, error, isLoading };
};
