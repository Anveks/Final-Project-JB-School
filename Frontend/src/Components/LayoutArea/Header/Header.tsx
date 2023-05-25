import { NavLink } from "react-router-dom";
import "./Header.css";
import { authStore } from "../../../Redux/AuthState";
import Logout from "../../AuthArea/Logout/Logout";
import { useState, useEffect } from "react";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";

function Menu(): JSX.Element {

    const [token, setToken] = useState<string>(authStore.getState().token);
    const admin = authStore.getState().user?.roleId === 1 ? true : false;

    useEffect(() => {
        const unsubscribe = authStore.subscribe(() => {
            setToken(authStore.getState().token);
        });

        return () => unsubscribe();
    }, []);

    async function handleDownload(): Promise<any> {
        try {
            // get fileData and transform it to a Blob object:
            const fileData = await dataService.getCSVFileData();
            const blob = new Blob([fileData], { type: 'text/csv' });

            // Create a link to download the CSV file:
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'vacations-data.csv';

            // trigger click:
            link.click();
        } catch (err: any) {
            notifyService.error(err.message);
        }
    }

    return (
        <div className="Header">
            <div className="logo">vacations.com</div>

            {
                token === null
                    ? <div className="navigation">
                        <NavLink to="/home">Home</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Sign Up</NavLink>
                    </div>
                    : <div className="navigation">
                        {admin && <NavLink to="/home">Home</NavLink>}
                        {admin && <NavLink to="/add">Add Vacation</NavLink>}
                        {admin && <NavLink to="chart"> See Chart </NavLink>}
                        {admin && <NavLink to="#" onClick={handleDownload}>Download CSV</NavLink>}
                        <Logout />
                    </div>
            }

        </div>
    );
}

export default Menu;
