import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ChartBar from "../ChartBar/ChartBar";
import "./LikesChart.css";
import VacationModel from "../../../../Models/VacationModel";
import dataService from "../../../../Services/DataService";
import notifyService from "../../../../Services/NotifyService";

function LikesChart(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const followersCountArr = Array.from(vacations.map((v) => v.followersCount));
    const maxValue = Math.max(...followersCountArr);
    console.log(followersCountArr, maxValue);

    useEffect(() => {
        dataService.getAllVacations()
            .then((res) => {
                setVacations(res);
            })
            .catch((err) => notifyService.error(err.message));
    }, []);

    return (
        <div className="LikesChart">
            <div className="chartHeader">
                <h2>Chart List of Followers</h2>
            </div>
            {vacations.map((v) =>
                <ChartBar
                    key={v.vacationId}
                    value={v.followersCount}
                    maxValue={maxValue}
                    label={v.destination}
                />)}
        </div>
    );
}

export default LikesChart;
