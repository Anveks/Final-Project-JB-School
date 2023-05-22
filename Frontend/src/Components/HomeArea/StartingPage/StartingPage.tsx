import vacations from '../../../Assets/img/vacations-img.jpg';
import { authStore } from "../../../Redux/AuthState";
import Home from "../Home/Home";
import "./StartingPage.css";

function StartingPage(): JSX.Element {
    const isLoggedIn = authStore.getState().isLoggedIn;
    return (
        <div className="StartingPage">
            {
                isLoggedIn
                    ? <div>
                        <div>
                            <p className="title">TAKE A BREAK AND LETS HOLIDAY!</p>
                            <p className="intro">Welcome to Vacations! Explore breathtaking destinations, immerse yourself in vibrant cultures, and create unforgettable memories. Start your journey with us today!</p>
                            <button>Learn More</button>
                        </div>

                        <img src={vacations} alt="vacations" />
                    </div>

                    : <Home />
            }

        </div>
    );
}

export default StartingPage;
