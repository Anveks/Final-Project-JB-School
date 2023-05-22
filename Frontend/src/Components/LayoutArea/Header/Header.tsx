import { NavLink } from "react-router-dom";
import "./Header.css";
import { authStore } from "../../../Redux/AuthState";
import Logout from "../../AuthArea/Logout/Logout";
import { useState, useEffect } from "react";

function Menu(): JSX.Element {

    const [loggedIn, setIsLoggedIn] = useState<boolean>(authStore.getState().token !== null ? true : false);

    useEffect(() => {
        const unsubscribe = authStore.subscribe(() => {
            setIsLoggedIn(authStore.getState().isLoggedIn);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="Header">
            <div className="logo">vacations.com</div>

            {
                !loggedIn ?
                    <div className="navigation">
                        <NavLink to="/home">Home</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Sign Up</NavLink>
                    </div>
                    :
                    <div>
                        <Logout />
                    </div>
            }

        </div>
    );
}

export default Menu;
