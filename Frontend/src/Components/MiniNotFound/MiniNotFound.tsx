import "./MiniNotFound.css";
import miniNotFound from '../../assets/img/not-found-mini.gif'

function MiniNotFound(): JSX.Element {
    return (
        <div className="MiniNotFound">
            <p>No vacations found... ☹️ </p>
            <img src={miniNotFound} />
        </div>
    );
}

export default MiniNotFound;
