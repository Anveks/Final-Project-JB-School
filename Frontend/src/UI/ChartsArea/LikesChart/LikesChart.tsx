import { vacationsStore } from "../../../Redux/VacationsState";
import ChartBar from "../ChartBar/ChartBar";
import "./LikesChart.css";

function PopulationChart(): JSX.Element {
    const vacations = vacationsStore.getState().vacations;
    const followersCountArr = Array.from(vacations.map((v) => v.followersCount));
    const maxValue = Math.max(...followersCountArr);
    console.log(followersCountArr, maxValue);

    return (
        <div className="PopulationChart">
            {vacations.map((item) =>
                <ChartBar
                    value={item.followersCount}
                    maxValue={maxValue}
                    label={item.destination}
                />)}
        </div>
    );
}

export default PopulationChart;
