import {useState} from "react";

export default function Authenticate({token, setUsername}) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    async function handleClick() {
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await response.json();
            console.log(result);
            if (result.message !== "jwt malformed") {
                setSuccessMessage(result.message);
                setUsername(result.data.username);
                setError(null);
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <>
            <div className="card">
                <h2>Authenticate</h2>
                <button
                    className="button"
                    onClick={() => {
                        handleClick();
                    }}
                >
                    Authenticate Token
                </button>
                {successMessage && <p className="success">{successMessage}</p>}
                {error && <p className="error">{error}</p>}
            </div>
        </>
    );
}
