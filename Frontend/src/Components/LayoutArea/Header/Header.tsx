import { NavLink } from "react-router-dom";
import "./Header.css";
import { authStore } from "../../../Redux/AuthState";
import Logout from "../../AuthArea/Logout/Logout";
import { useState, useEffect } from "react";

function Menu(): JSX.Element {

    const [token, setToken] = useState<string>(authStore.getState().token);
    const admin = authStore.getState().user.roleId === 1 ? true : false;

    useEffect(() => {
        const unsubscribe = authStore.subscribe(() => {
            setToken(authStore.getState().token);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="Header">
            <div className="logo">vacations.com</div>

            {
                token === null ?
                    <div className="navigation">
                        <NavLink to="/home">Home</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Sign Up</NavLink>
                    </div>
                    :
                    <div className="navigation">

                        <NavLink to="/home">Home</NavLink>

                        {admin &&
                            <NavLink to="/add">Add Vacation</NavLink>
                        }

                        <Logout />
                    </div>
            }

        </div>
    );
}

export default Menu;
