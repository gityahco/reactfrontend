import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/contextProvider";
import { axiosClient } from "../../axios-client";
export default function Singup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();
    const onSubmit = (ev) => {
        ev.preventDefault();
        const payLoad = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        axiosClient
            .post("/signup", payLoad)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <h3>Sign Up For Free</h3>

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
                    // type="password"
                    placeholder="Password"
                />
                <input
                    ref={passwordConfirmationRef}
                    // type="password"
                    placeholder="Password confirmation"
                />
                <button>Sign up</button>
                <p>
                    Already have an account?
                    <Link to="/login">Login to your account</Link>
                </p>
            </form>
        </div>
    );
}
