import Like from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { authStore } from '../../Redux/AuthState';
import notifyService from '../../Services/NotifyService';
import { VacationsAcrionType, vacationsStore } from '../../Redux/VacationsState';

// connecting to the socket.io port:
const socket = io('http://localhost:4001');

function LikeButton(props: any): JSX.Element {

  // check if admin:
  const role = authStore.getState().user?.roleId;
  const admin = role === 1 ? true : false;

  // like animation:
  const [likeActive, setLikeActive] = useState<boolean>(false);
  const btnClasses = `likeBtn ${likeActive && 'like'}`;
  setTimeout(() => {
    setLikeActive(false);
  }, 300);

  // socket.io likes handling:
  const [isFollowing, setIsFollowing] = useState<boolean>(props.vacations.isFollowing === 1 ? true : false);

  async function handleLike() {
    setLikeActive(true);
    try {
      const userId = authStore.getState().user?.userId;
      const vacationId = props.vacations.vacationId;

      if (!isFollowing) {
        socket.emit("addLike", { userId, vacationId })
        setIsFollowing(true)
      } else {
        socket.emit("removeLike", { userId, vacationId })
        setIsFollowing(false);
      }

    } catch (err: any) {
      notifyService.error(err.message);
      console.error(err.message);
    }
  }

  // updating likes count:
  const [followersCount, setFollowersCount] = useState<number>(props.vacations.followersCount);
  useEffect(() => {
    socket.on("updateFollowersCount", (data: any) => {
      if (data.vacationId === props.vacations.vacationId) {
        vacationsStore.dispatch({ type: VacationsAcrionType.UpdateVacations, payload: data })
        setFollowersCount(data.followersCount);
      }
    });
  }, [isFollowing]);

  return (
    <div className="LikeButton">
      <div className={btnClasses} onClick={() => handleLike()} style={{ display: admin ? "none" : "", color: isFollowing ? "red" : "lightblue" }}><Like /> <div>{followersCount}</div></div>
    </div >
  );
}

export default LikeButton;

