import "./Card.css";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';
import { authStore } from "../../Redux/AuthState";
import { NavLink } from "react-router-dom";

function Card(props: any): JSX.Element {

    // check if admin:
    const role = authStore.getState().user?.roleId;
    const admin = role === 1 ? true : false;

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}.${month}.${year}`;
    }

    return (
        <div className="Card">
            <div className="admin-field" style={{ display: admin ? "" : "none" }}>
                <div className="edit"><ModeEditIcon fontSize="inherit" /> <NavLink to="edit"> Edit </NavLink> </div>
                <div className="delete"><ClearIcon fontSize="inherit" /> <NavLink to="#"> Delete </NavLink></div>
            </div>
            <div className="head">
                <div className="title">{props.vacation.destination}</div>
                <button className="price">{props.vacation.price}$</button>
            </div>
            <div className="body">
                <div className="image">
                    <img src={props.vacation.imageUrl} />
                </div>
                <div className="date">{formatDate(props.vacation.startDate)} - {formatDate(props.vacation.endDate)}</div>
                <div className="description">
                    {props.vacation.description}
                </div>
            </div>
        </div>
    );
}

export default Card;
