import NoLike from '@mui/icons-material/FavoriteBorder';
import Like from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";
import dataService from '../../Services/DataService';
import notifyService from '../../Services/NotifyService';
import { authStore } from '../../Redux/AuthState';
import { Socket, io } from "socket.io-client";

// connecting to the socket.io port:
const socket = io('http://localhost:4001');

function LikeButton(props: any): JSX.Element {

  // check if admin:
  const role = authStore.getState().user?.roleId;
  const admin = role === 1 ? true : false;

  const [likeActive, setLikeActive] = useState<boolean>(false);
  const btnClasses = `likeBtn ${likeActive && 'like'}`;
  setTimeout(() => {
    setLikeActive(false);
  }, 300);

  async function handleLike() {
    try {
      const userId = authStore.getState().user?.userId;
      const vacationId = props.vacations.vacationId;

      if (props.vacations.isFollowing === 0) {
        socket.emit("addLike", { userId, vacationId })
      } else {
        socket.emit("removeLike", { userId, vacationId })
      }

      setLikeActive(true);
    } catch (err: any) {
      notifyService.error(err.message);
      console.error(err.message);
    }
  }

  const [followersCount, setFollowersCount] = useState<number>(props.vacations.followersCount);
  useEffect(() => {
    socket.on("updateFollowersCount", (data: { vacationId: number, followersCount: number }) => {
      if (data.vacationId === props.vacations.vacationId) {
        setFollowersCount(data.followersCount);
      }
    });
  }, []);

  const [color, setColor] = useState("lightblue")

  return (
    <div className="LikeButton">
      {/* @ts-ignore */}
      <div className={btnClasses} onClick={() => handleLike()} style={{ display: admin ? "none" : "", color: { color } }}><Like /> <div>{followersCount}</div></div>
    </div >
  );
}

export default LikeButton;