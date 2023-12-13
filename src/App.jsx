import {useState} from "react";
import "./App.css";
import SignUpForm from "./components/SignUpForm";
import Authenticate from "./components/Authenticate";

function App() {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);

    return (
        <>
            <h1>{username}</h1>
            <SignUpForm setToken={setToken} />
            <Authenticate token={token} setUsername={setUsername} />
        </>
    );
}

export default App;
