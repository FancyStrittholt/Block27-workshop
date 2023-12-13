import {useState, useEffect} from "react";

export default function SignUpForm({setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            signUp();
        }
    }, [errors]);

    const validateValues = () => {
        const errors = {};
        if (username.length < 8) {
            errors.username = "Username must be at least 8 characters in length";
        }
        if (password.length < 8) {
            errors.password = "Password must be at least 8 characters in length";
        }
        return errors;
    };

    async function handleSubmit(event) {
        event.preventDefault();
        setErrors(validateValues());
        setSubmitting(true);
    }

    const signUp = async () => {
        try {
            const response = await fetch(`https://fsa-jwt-practice.herokuapp.com/signup`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            const result = await response.json();
            console.log(result);
            setToken(result.token);
            setUsername("");
            setPassword("");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div className="card">
                <h2>Sign Up!</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Username: <input value={username} onChange={(event) => setUsername(event.target.value)} />
                    </label>
                    <label>
                        Password: <input value={password} onChange={(event) => setPassword(event.target.value)} />
                    </label>
                    <button className="button">Submit</button>
                </form>

                {Object.keys(errors).length === 0 && submitting ? (
                    <span className="success">Successfully submitted </span>
                ) : null}

                {errors.username ? <p className="error">{errors.username}</p> : null}
                {errors.password ? <p className="error">{errors.password}</p> : null}
            </div>
        </>
    );
}
