import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import "./VacationsList.css";
import dataService from "../../../Services/DataService";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";

function VacationsList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const id = +authStore.getState().user.userId;

    useEffect(() => {
        dataService.getAllVacations(id)
            .then((res) => setVacations(res))
            .catch((err) => notifyService.error(err.message));
    }, []);

    console.log(id);
    console.log(vacations);

    return (
        <div className="VacationsList">

        </div>
    );
}

export default VacationsList;
