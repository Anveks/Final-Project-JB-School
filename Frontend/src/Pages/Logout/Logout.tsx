import { useNavigate } from "react-router-dom";
import authService from "../../Services/AuthService";
import notifyService from "../../Services/NotifyService";
import "./Logout.css";

function Logout(): JSX.Element {
    const navigate = useNavigate();
    function logout(): void {
        authService.logout();
        notifyService.success("Come back soon!");

        setTimeout(() => {
            navigate('/login');
        }, 1500);
    }
    return (
        <div className="Logout">
            <button className="logout" onClick={logout}>Logout</button>
        </div>
    );
}

export default Logout;
