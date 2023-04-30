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

  // TODO: fix sockets part
  socket.on('updateFollowers', (data: any) => {
    // console.log(data);

    // vacationsStore.dispatch({
    //   type: VacationsActionType.UpdateFollowers,
    //   payload: {
    //     vacationId: data.vacationId,
    //     isFollowing: data.isFollowing
    //   }
    // });

  });

  // add-remove-like animation:
  const [likeActive, setLikeActive] = useState<boolean>(false);
  const btnClasses = `likeBtn ${likeActive && 'like'}`;
  setTimeout(() => {
    setLikeActive(false);
  }, 300);

  const currentUser = authStore.getState().user.userId;
  const [isFollowing, setIsFollowing] = useState(props.vacations.isFollowing);
  const [followersCount, setFollowersCount] = useState<number>(props.vacations.followersCount);

  useEffect(() => {
    const unsubscribe = vacationsStore.subscribe(() => {
      const index = vacationsStore.getState().vacations.findIndex((v) => v.vacationId === props.vacations.vacationId); // getting current index
      const isFollowingState = vacationsStore.getState().vacations[index].isFollowing; // getting up-to-date isFollowing state
      const followersCount = vacationsStore.getState().vacations[index].followersCount; // getting up-to-date followersCount
      setIsFollowing(isFollowingState);
      setFollowersCount(followersCount);
    });

    return () => unsubscribe();
  }, [isFollowing, followersCount, currentUser]);

  const newFollowingState = props.vacations.isFollowing === 0 ? 1 : 0;
  async function handleLike() {
    setLikeActive(true); // animation state

    try {

      const vacationId = +props.vacations.vacationId; // getting current vacation id
      const newFollowingState = props.vacations.isFollowing === 0 ? 1 : 0; // initializing the new isFollowing state

      isFollowing === 0
        ? await dataService.addLike(vacationId)
        : await dataService.removeLike(vacationId); // defining add/remove action

      vacationsStore.dispatch({
        type: VacationsActionType.UpdateFollowers,
        payload: {
          vacationId: vacationId,
          isFollowing: newFollowingState,
          userId: +currentUser
        }
      }); // dispatching the data to Redux for an update
      console.log(isFollowing);

    } catch (err: any) {

      notifyService.error(err.message)
      console.log(isFollowing);
      console.log(newFollowingState);

    }
  };

  return (
    <div className="LikeButton">
      <div className={btnClasses} onClick={() => handleLike()} style={{ color: isFollowing ? 'red' : 'lightblue' }}>
        <Like />
        <div>{followersCount}</div>
      </div>
    </div >
  );
}

export default LikeButton;

