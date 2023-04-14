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
import LikeButton from "../LikeButton/LikeButton";

function Card(props: any): JSX.Element {

    const navigate = useNavigate();
    // const [followersCount, setFollowersCount] = useState<number>(props.vacation.followersCount);
    // const [clicked, setClicked] = useState<boolean>(props.vacation.isFollowing === 1 ? true : false);

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

            // TODO: check for a better solution
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Card">
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
