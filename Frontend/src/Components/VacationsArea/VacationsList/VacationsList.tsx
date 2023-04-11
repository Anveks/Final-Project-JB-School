import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import "./VacationsList.css";
import dataService from "../../../Services/DataService";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import Card from "../../../UI/Card/Card";

function VacationsList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
        dataService.getAllVacations()
            .then((res) => setVacations(res))
            .catch((err) => notifyService.error(err.message));
    }, []);

    return (
        <div className="VacationsList">
            {vacations.map((v) => <Card vacation={v} key={v.vacationId} ></Card>)}
        </div>
    );
}

export default VacationsList;
