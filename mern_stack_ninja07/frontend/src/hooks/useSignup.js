import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState("");
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
		setIsLoading(true);
		setError(null);

        const response = await fetch("/api/users/signup", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await response.json();

        if (!response.ok) {
			setIsLoading(false);
            setError(json.message);
        }

        if (response.ok) {
            // save user to local storage
            localStorage.setItem("user", JSON.stringify(json));

            // call dispatch to update global context
            dispatch({ type: "LOGIN", payload: json });

            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};
