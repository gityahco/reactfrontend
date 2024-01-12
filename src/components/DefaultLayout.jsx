import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/contextProvider";
import { axiosClient } from "../../axios-client";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }
    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post('/logout')
        .then(() => {
            setUser({})
            setToken(null)
        })
        .catch(err => console.log("logout error: " ,err))
        // console.log("hi every one")
    };
    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => { setUser(data) })
     }, [])
    return (
        <div>
            DefaultLayout
            <div>--------------</div>
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div>
                {user.name}
                <a href="#" onClick={onLogout}>
                    Logout
                </a>
            </div>
            <div>--------------</div>
            <Outlet />
        </div>
    );
}
