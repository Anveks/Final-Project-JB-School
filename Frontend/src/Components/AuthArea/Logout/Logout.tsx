import { useNavigate } from "react-router-dom";
import "./Logout.css";
import LogoutIcon from '@mui/icons-material/Logout';
import { vacationsStore, VacationsActionType } from "../../../Redux/VacationsState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function Logout(): JSX.Element {
    const navigate = useNavigate();
    function logout(): void {
        authService.logout();
        notifyService.success("Come back soon!");

        navigate('/login');
        vacationsStore.dispatch({ type: VacationsActionType.ResetVacations });

        // setTimeout(() => {
        //     navigate('/login');
        //     vacationsStore.dispatch({ type: VacationsActionType.ResetVacations });
        // }, 1500);
    }
    return (
        <div className="Logout">
            <button className="logout" onClick={logout}> <LogoutIcon /></button>
        </div>
    );
}

export default Logout;
