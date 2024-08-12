import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
	const {signup, error, isLoading} = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
		signup(email, password);
    };

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h4>Add New User</h4>

            <label>Email: </label>
            <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Add User</button>
			{error && <div className="error">{error}</div>}
        </form>
    );
}

export default Signup;
