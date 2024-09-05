import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export const useAuthContext = () => {
	const context = useContext(AuthContext);

	if (!context) {
		return new Error("useAuthContext must be inside AuthContextProvider");
	}

	return context;
}