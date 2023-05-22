import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">

            <Header />
            <hr />

            <Routing />

        </div>
    );
}

export default Layout;
