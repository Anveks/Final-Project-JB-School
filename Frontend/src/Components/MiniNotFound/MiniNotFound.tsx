import "./MiniNotFound.css";
import miniNotFound from '../../assets/img/not-found-mini.gif'

function MiniNotFound(): JSX.Element {
    return (
        <div className="MiniNotFound">
            <p>No vacations found... ☹️ Try realoading the page or selecting another filter.</p>
            <img src={miniNotFound} />
        </div>
    );
}

export default MiniNotFound;
