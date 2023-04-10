import VacationsList from "../../Components/VacationsArea/VacationsList/VacationsList";
import { authStore } from "../../Redux/AuthState";
import Header from "../../UI/Header/Header";
import Logout from "../Logout/Logout";
import "./Home.css";

function Home(): JSX.Element {

    return (
        <div className="Home">
            <Header />
            <VacationsList />
        </div>
    );
}

export default Home;
