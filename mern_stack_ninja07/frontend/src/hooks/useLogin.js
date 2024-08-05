import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState("");
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/users/login", {
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

    return { login, isLoading, error };
};
