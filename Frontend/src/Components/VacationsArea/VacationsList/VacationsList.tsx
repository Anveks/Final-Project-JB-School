import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import "./VacationsList.css";
import dataService from "../../../Services/DataService";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import Card from "../../../UI/Card/Card";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function VacationsList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    // pagination:
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const vacationsToDisplay = vacations.slice(startIndex, endIndex);

    // transition:
    const [transition, setTransition] = useState("");
    function handlePageChange(pageNumber: number) {
        setTransition("nextPage 1s ease-out forwards");
        setCurrentPage(pageNumber);
        setTransition("");
    }

    useEffect(() => {
        dataService.getAllVacations()
            .then((res) => setVacations(res))
            .catch((err) => notifyService.error(err.message));
    }, []);

    return (
        <div className="VacationsList" style={{ animation: transition }}>
            {vacationsToDisplay.map((v) => (
                <Card vacation={v} key={v.vacationId}></Card>
            ))}

            <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}> <ArrowBackIosIcon /> </button>
                <button disabled={endIndex >= vacations.length} onClick={() => handlePageChange(currentPage + 1)}> <ArrowForwardIosIcon /> </button>
            </div>
        </div>
    );
}

export default VacationsList;
