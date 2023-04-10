import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import "./VacationsList.css";
import dataService from "../../../Services/DataService";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import Card from "../../../UI/Card/Card";

function VacationsList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    // const id = +authStore.getState().user.userId;

    useEffect(() => {
        dataService.getAllVacations()
            .then((res) => setVacations(res))
            .catch((err) => notifyService.error(err.message));
    }, []);

    console.log(vacations);

    return (
        <div className="VacationsList">
            {vacations.map((v) => <Card vacation={v} key={v.vacationId}></Card>)}
        </div>
    );
}

export default VacationsList;
