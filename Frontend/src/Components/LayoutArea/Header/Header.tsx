import { NavLink } from "react-router-dom";
import "./Header.css";

function Menu(): JSX.Element {
    return (
        <div className="Header">
            <div className="logo">vacations.com</div>

            <div className="navigation">
                <NavLink to="/home">Home</NavLink>

                <NavLink to="/list">List</NavLink>

                <NavLink to="/insert">Insert</NavLink>
            </div>

        </div>
    );
}

export default Menu;
