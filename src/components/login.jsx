import React, { useState } from "react";
import axios from "axios";

function Login({ onSuccessfulLogin, onLoginFailure }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        console.log(username)
        console.log(password)
        try {

            // Send a POST request to the Flask endpoint
            const response = await axios.post("http://localhost:5000/login", {
                username,
                password,
            });

            // Check the response from the server
            if (response.data.success) {
                // If login is successful, call the onSuccessfulLogin callback
                onSuccessfulLogin(username);
            } else {
                // If login fails, call the onLoginFailure callback
                onLoginFailure();
            }
        } catch (error) {
            console.error("Login error:", error);
            onLoginFailure();
        }
    }

    return (
        <div>
            <h1 className="text-center">LOGIN PAGE</h1>
            <div className="container-form">
                <form className="my-4" method="POST" id="loginForm">
                    <div className="container mx-auto">
                        <div className="form-group mt-4 mx-auto text-center">
                            <label htmlFor="username">USERNAME:</label>
                            <input
                                type="text"
                                style={{ width: '70%' }}
                                className="form-control col-md-4 mx-auto"
                                id="username"
                                name="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-group mx-auto text-center">
                            <label htmlFor="password">PASSWORD:</label>
                            <input
                                type="password"
                                style={{ width: '70%' }}
                                className="form-control col-md-4 mx-auto"
                                id="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            className="btn btn-info btn-block my-3"
                            style={{ borderRadius: 50, fontWeight: 1000 }}
                            type="button"
                            onClick={handleLogin}
                        >
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
