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
                <div className="start-title">TAKE A BREAK AND LET'S HOLIDAY!</div>
                Welcome to Vacations! Explore breathtaking destinations, immerse yourself in vibrant cultures, and create unforgettable memories. Start your journey with us today!
                <button onClick={() => { navigate("/login") }}>Get Started</button>
            </div>

            <img src={vacations} alt="vacations" />
        </div>
    );
}

export default StartingPage;
