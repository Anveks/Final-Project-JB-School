import { authStore } from "../../../Redux/AuthState";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import StartingPage from "../StartingPage/StartingPage";
import "./Home.css";

function Home(): JSX.Element {

    const token = authStore.getState().token;

    return (
        <div className="Home">
            {
                token ? <VacationsList /> : <StartingPage />
            }
        </div>
    );
}

export default Home;
