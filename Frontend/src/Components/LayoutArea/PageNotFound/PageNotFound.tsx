import "./PageNotFound.css";
import catFound from "../../../Assets/img/not-found-cat.jpg";
import { NavLink } from "react-router-dom";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <img src={catFound} alt="cat" />
            <div>
                It appears the page you are looking for has been stolen by kittens! To get back where you were either click your back button or <NavLink to={"/home"}>home</NavLink>, or <NavLink to={"/contactUs"}>get in touch</NavLink> to tell us about this abysmal act.
            </div>
        </div>
    );
}

export default PageNotFound;
