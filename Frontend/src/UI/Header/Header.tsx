import { NavLink } from "react-router-dom";
import Logout from "../../Pages/Logout/Logout";
import { authStore } from "../../Redux/AuthState";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "./Header.css";

function Header(): JSX.Element {

    const fullName = authStore.getState().user.firstName + " " + authStore.getState().user.lastName;

    // check if admin:
    const role = authStore.getState().user?.roleId;
    const admin = role === 1 ? true : false;

    return (
        <div className="header">

            <p>Vacations</p>
            <div className="user"> Hello, {fullName}
                <Logout />
                <div className="admin-field" style={{ display: admin ? "" : "none" }}>
                    <NavLink to={"add"}>  Add Vacation</NavLink>
                </div>
            </div>

        </div>
    );
}

export default Header;
