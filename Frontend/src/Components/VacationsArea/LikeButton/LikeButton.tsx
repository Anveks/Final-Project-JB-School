import Like from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { VacationsActionType, vacationsStore } from '../../../Redux/VacationsState';
import dataService from '../../../Services/DataService';
import notifyService from '../../../Services/NotifyService';
import { authStore } from '../../../Redux/AuthState';
import appConfig from '../../../Utils/AppConfig';

// connecting to the socket.io port:
const socket = io(appConfig.socketUrl);

function LikeButton(props: any): JSX.Element {

  socket.on('updateFollowers', (data: any) => {
    console.log(data);

    // vacationsStore.dispatch({
    //   type: VacationsActionType.UpdateFollowers,
    //   payload: {
    //     vacationId: data.vacationId,
    //     isFollowing: data.isFollowing
    //   }
    // });

  });

  // like animation:
  const [likeActive, setLikeActive] = useState<boolean>(false);
  const btnClasses = `likeBtn ${likeActive && 'like'}`;
  setTimeout(() => {
    setLikeActive(false);
  }, 300);

  // check if admin:
  const role = authStore.getState().user?.roleId;
  const admin = role === 1 ? true : false;

  const [isFollowing, setIsFollowing] = useState(props.vacations.isFollowing === 0 ? false : true);
  const [followersCount, setFollowersCount] = useState<number>(props.vacations.followersCount);

  useEffect(() => {
    const unsubscribe = vacationsStore.subscribe(() => {
      const index = vacationsStore.getState().vacations.findIndex((v) => v.vacationId === props.vacations.vacationId);
      const isFollowingState = Boolean(vacationsStore.getState().vacations[index].isFollowing);
      const followersCount = vacationsStore.getState().vacations[index].followersCount;
      setIsFollowing(isFollowingState);
      setFollowersCount(followersCount)
    });

    return () => unsubscribe();
  }, [])

  async function handleLike() {
    setLikeActive(true)
    try {
      let isFollowing = props.vacations.isFollowing;
      const vacationId = +props.vacations.vacationId;
      // TODO: refactoring

      if (isFollowing === 0) {
        await dataService.addLike(vacationId);
        vacationsStore.dispatch({ type: VacationsActionType.UpdateFollowers, payload: { vacationId: vacationId, isFollowing: isFollowing ? 0 : 1 } });
      } else {
        await dataService.removeLike(vacationId);
        vacationsStore.dispatch({ type: VacationsActionType.UpdateFollowers, payload: { vacationId: vacationId, isFollowing: isFollowing ? 0 : 1 } });
      }

    } catch (err: any) {
      notifyService.error(err.message)
      console.log(err);
    }
  };

  return (
    <div className="LikeButton">
      <div className={btnClasses} onClick={() => handleLike()} style={{ display: admin ? "none" : "", color: isFollowing ? 'red' : 'lightblue' }}>
        <Like />
        <div>{followersCount}</div>
      </div>
    </div >
  );
}

export default LikeButton;

