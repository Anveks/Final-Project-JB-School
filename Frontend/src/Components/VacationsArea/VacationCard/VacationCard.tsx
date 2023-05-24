import Like from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authStore } from '../../../Redux/AuthState';
import { vacationsStore } from '../../../Redux/VacationsState';
import dataService from '../../../Services/DataService';
import formatDate from '../../../Services/DateFormatter';
import notifyService from '../../../Services/NotifyService';
import "./VacationCard.css";
import MoreHorizIcon from '@mui/icons-material/MoreVert';

function VacationCard(props: any): JSX.Element {

    // destructuring the props.vacation:
    const { description, destination, startDate, endDate, followersCount, isFollowing, imageUrl, price, vacationId } = props.vacation;

    // checking if admin:    
    const admin = authStore.getState().user?.roleId === 1 ? true : false;

    const navigate = useNavigate();

    async function deleteVacation() {
        try {
            const ok = window.confirm("Are you sure?");
            if (!ok) return;
            await dataService.deleteVacation(vacationId);
            notifyService.success("Vacation has been deleted");


            // TODO: delete from the page
        }
        catch (err: any) {
            notifyService.error(err);
            console.log(err);
        }
    };

    // add-remove-like animation:
    const [likeActive, setLikeActive] = useState<boolean>(false);
    const btnClasses = `likeBtn ${likeActive && 'like'}`;
    setTimeout(() => {
        setLikeActive(false);
    }, 300);

    const [isFollowingState, setIsFollowing] = useState(isFollowing);
    const [followersCountState, setFollowersCount] = useState<number>(followersCount);

    useEffect(() => {
        const unsubscribe = vacationsStore.subscribe(() => {
            const index = vacationsStore.getState().vacations.findIndex((v) => v.vacationId === vacationId); // getting current index
            const isFollowingState = vacationsStore.getState().vacations[index]?.isFollowing; // getting up-to-date isFollowing state
            const followersCount = vacationsStore.getState().vacations[index]?.followersCount; // getting up-to-date followersCount
            setIsFollowing(isFollowingState);
            setFollowersCount(followersCount);
        });

        return () => unsubscribe();
    }, [isFollowingState, followersCountState]);

    async function handleLike() {

        setLikeActive(true); // animation state

        try {
            const currentVacationId = +vacationId; // getting current vacation id
            const newFollowingState = isFollowing === 0 ? 1 : 0; // initializing the new isFollowing state
            isFollowing === 0
                ? await dataService.handleLike(currentVacationId, newFollowingState)
                : await dataService.handleLike(currentVacationId, newFollowingState, true); // sending an extra argument here to remove like
        } catch (err: any) {
            notifyService.error(err.message)
        }
    };

    return (
        <div className="main-container">

            {!admin && <div className="LikeButton">
                <div className={btnClasses} onClick={() => handleLike()} style={{ color: isFollowing ? 'red' : 'lightgreen' }}>
                    <Like />
                    <div>{followersCount}</div>
                </div>
            </div>}

            {
                admin && <div className="admin-field dropdown">
                    <button className="dropBtn"><MoreHorizIcon /></button>
                    <div className="dropdown-content">
                        <NavLink
                            to="edit"
                            state={{ id: vacationId }}>
                            Edit Vacation
                        </NavLink>
                        <a href="#" onClick={deleteVacation}>Delete Vacation</a>
                    </div>
                </div>
            }

            <div className="card">
                <img src={imageUrl} alt="vacation-image" />

                <div className="intro">

                    <div className="details">
                        <div className="destination-date">
                            <h3>{destination}</h3>
                            <h5>{formatDate(startDate)} - {formatDate(endDate)}</h5>
                        </div>

                        <div className='price'>{price}.00$</div>
                    </div>

                    <p>{description}</p>
                </div>
            </div>

        </div>
    );
}

export default VacationCard;
