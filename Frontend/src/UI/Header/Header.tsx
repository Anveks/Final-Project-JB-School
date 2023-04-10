import Logout from "../../Pages/Logout/Logout";
import { authStore } from "../../Redux/AuthState";
import "./Header.css";

function Header(): JSX.Element {

    const fullName = authStore.getState().user.firstName + " " + authStore.getState().user.lastName;

    return (
        <div className="header">

            <p>Vacations</p>
            <div className="user">
                {fullName}
                <Logout />
            </div>

        </div>
    );
}

export default Header;
