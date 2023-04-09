import { authStore } from "../../Redux/AuthState";
import Logout from "../Logout/Logout";
import "./Home.css";

function Home(): JSX.Element {
    const fullName = authStore.getState().user.firstName + " " + authStore.getState().user.lastName;
    return (
        <div className="Home">
            <h2>Im a Home Page</h2>
            <span className="greeting">Welcome back, {fullName} </span>
            <Logout />
        </div>
    );
}

export default Home;
