import React, { useRef, useState } from "react";
import { useStateContext } from "../context/contextProvider";
import { axiosClient } from "../../axios-client";

import { Link } from "react-router-dom";

export default function Login() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payLoad = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            name: nameRef.current.value,
        };
        setErrors(null);
        axiosClient
            .post("/login", payLoad)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message],
                        });
                    }
                }
            });
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <h3>Login In</h3>
                {errors && (
                    <div>
                        {Object.keys(errors).map((key) => (
                            <p key={key} style={{ margin: "5px 0" }}>
                                <span
                                    style={{
                                        backgroundColor: "red",
                                        padding: "2px 5px", // Optional: Add padding for better appearance
                                    }}
                                >
                                    {errors[key][0]}
                                </span>
                            </p>
                        ))}
                    </div>
                )}
                <input ref={nameRef} placeholder="User name" />
                <input ref={emailRef} type="email" placeholder="Email" />
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                />
                <button>Login</button>
                <p>
                    Not registered <Link to="/signup">Create an account</Link>
                </p>
            </form>
        </div>
    );
}
