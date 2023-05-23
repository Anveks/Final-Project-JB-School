import MoreHorizIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./VacationCard.css";
import { authStore } from '../../../Redux/AuthState';
import dataService from '../../../Services/DataService';
import notifyService from '../../../Services/NotifyService';
import LikeButton from '../LikeButton/LikeButton';

function VacationCard(props: any): JSX.Element {

    const { description, destination, startDate, endDate, followersCount, isFollowing, imageUrl, price, vacationId } = props.vacation;

    const navigate = useNavigate();
    // const [visible, setVisible] = useState<boolean>(true);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    function handleModal() {
        modalOpen ? setModalOpen(false) : setModalOpen(true);
    }

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

            // setTimeout(() => {
            //     setVisible(false)
            // }, 1500);
        }
        catch (err: any) {
            notifyService.error(err);
            console.log(err);

        }
    }

    return (
        <div className="main-container">

            <div className="card">
                <img src={imageUrl} alt="vacation-image" />

                <div className="intro">
                    <h3>{destination}</h3>
                    <p>{description}</p>
                </div>
            </div>

        </div>
    );
}

export default VacationCard;
