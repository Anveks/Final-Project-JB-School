import Like from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";
import { vacationsStore } from '../../../Redux/VacationsState';
import dataService from '../../../Services/DataService';
import notifyService from '../../../Services/NotifyService';

function LikeButton(props: any): JSX.Element {

  // add-remove-like animation:
  const [likeActive, setLikeActive] = useState<boolean>(false);
  const btnClasses = `likeBtn ${likeActive && 'like'}`;
  setTimeout(() => {
    setLikeActive(false);
  }, 300);

  const [isFollowing, setIsFollowing] = useState(props.vacations.isFollowing);
  const [followersCount, setFollowersCount] = useState<number>(props.vacations.followersCount);

  useEffect(() => {
    const unsubscribe = vacationsStore.subscribe(() => {
      const index = vacationsStore.getState().vacations.findIndex((v) => v.vacationId === props.vacations.vacationId); // getting current index
      const isFollowingState = vacationsStore.getState().vacations[index]?.isFollowing; // getting up-to-date isFollowing state
      const followersCount = vacationsStore.getState().vacations[index]?.followersCount; // getting up-to-date followersCount
      setIsFollowing(isFollowingState);
      setFollowersCount(followersCount);
    });

    return () => unsubscribe();
  }, [isFollowing, followersCount]);

  const newFollowingState = props.vacations.isFollowing === 0 ? 1 : 0;
  async function handleLike() {
    setLikeActive(true); // animation state

    try {

      const vacationId = +props.vacations.vacationId; // getting current vacation id
      const newFollowingState = props.vacations.isFollowing === 0 ? 1 : 0; // initializing the new isFollowing state

      isFollowing === 0
        ? await dataService.handleLike(vacationId, newFollowingState)
        : await dataService.handleLike(vacationId, newFollowingState, true); // sending an extra argument here to remove like

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

