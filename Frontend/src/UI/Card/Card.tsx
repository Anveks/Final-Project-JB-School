import "./Card.css";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';
import { authStore } from "../../Redux/AuthState";
import { NavLink, useNavigate } from "react-router-dom";
import dataService from "../../Services/DataService";
import notifyService from "../../Services/NotifyService";
import NoLike from '@mui/icons-material/FavoriteBorder';
import Like from '@mui/icons-material/Favorite';
import { useState } from "react";
import LikeButton from "../../Components/VacationsArea/LikeButton/LikeButton";

function Card(props: any): JSX.Element {

    const navigate = useNavigate();
    const [visible, setVisible] = useState<boolean>(true);

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

    async function deleteVacation() {
        try {
            const ok = window.confirm("Are you sure?");
            if (!ok) return;
            await dataService.deleteVacation(props.vacation.vacationId);
            notifyService.success("Vacation has been deleted");

            setTimeout(() => {
                setVisible(false)
            }, 1500);
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Card" style={{ display: visible ? "" : "none" }}>
            <div className="admin-field" style={{ display: admin ? "" : "none" }}>
                <div className="edit">
                    <ModeEditIcon fontSize="inherit" /> <NavLink
                        to="edit"
                        state={{ id: props.vacation.vacationId }}>
                        Edit
                    </NavLink>
                </div>
                <p className="delete" onClick={deleteVacation}><ClearIcon fontSize="inherit" /> Delete</p>
            </div>
            <div className="head">
                <div className="title">{props.vacation.destination}</div>
                <p className="price">{props.vacation.price}$</p>
                <LikeButton
                    vacations={props.vacation} />
            </div>
            <div className="body">
                <div className="image">
                    <img src={props.vacation.imageUrl} />
                </div>
                <div className="date">{formatDate(props.vacation.startDate)} - {formatDate(props.vacation.endDate)}</div>
                <div className="description" style={{ height: admin ? "100px" : "140px" }}>
                    {props.vacation.description}
                </div>
            </div>
        </div >
    );
}

export default Card;
