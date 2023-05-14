import Header from "../../../UI/Header/Header";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
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
