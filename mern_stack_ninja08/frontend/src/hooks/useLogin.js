import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        console.log(email, password);

        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await response.json();

        if (response.ok) {
            setIsLoading(false);
            dispatch({ type: "LOGIN", payload: json });
            localStorage.setItem("user", JSON.stringify(json));
        }

        if (!response.ok) {
            setIsLoading(false);
            setError(json.message);
        }
    };

    return { login, error, isLoading };
};
