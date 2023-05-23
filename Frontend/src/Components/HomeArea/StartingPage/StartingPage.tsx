import { useEffect } from 'react';
import vacations from '../../../Assets/img/vacations-img.jpg';
import "./StartingPage.css";
import { authStore } from '../../../Redux/AuthState';
import { useNavigate } from 'react-router-dom';

function StartingPage(): JSX.Element {

    const token = authStore.getState().token;
    const navigate = useNavigate();

    useEffect(() => {

        if (token !== null) navigate("/home");

    }, []);

    return (
        <div className="StartingPage">
            <div>
                <p className="title">TAKE A BREAK AND LETS HOLIDAY!</p>
                <p className="intro">Welcome to Vacations! Explore breathtaking destinations, immerse yourself in vibrant cultures, and create unforgettable memories. Start your journey with us today!</p>
                <button>Learn More</button>
            </div>

            <img src={vacations} alt="vacations" />
        </div>
    );
}

export default StartingPage;
