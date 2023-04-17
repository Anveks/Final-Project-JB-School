import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import Card from "../../../UI/Card/Card";
import "./VacationsList.css";
import { vacationsStore } from '../../../Redux/VacationsState';

function VacationsList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    // pagination:
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 9;

    // transition:
    function handlePageChange(pageNumber: number) {
        setVacations(vacationsStore.getState().vacations)
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dataService.getAllVacations()
            .then((res) => setVacations(res))
            .catch((err) => notifyService.error(err.message));
    }, []);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const vacationsToDisplay = vacations.slice(startIndex, endIndex);

    function handleFilterChange(e: any) {
        let keyword = e.target.value;
        switch (keyword) {
            case "favorites":
                const favoriteVacations = vacations.filter((v) => v.isFollowing === 1);
                setVacations(favoriteVacations);
                break;
            case "current":
                const currentVacations = vacations.filter((v) => {
                    const startDate = new Date(v.startDate).getTime();
                    if (startDate < Date.now()) return v;
                });
                setVacations(currentVacations);
                break;
            case "future":
                const futureVacations = vacations.filter((v) => {
                    const startDate = new Date(v.startDate).getTime();
                    if (startDate > Date.now()) return v;
                });
                setVacations(futureVacations);
                break;
            default:
                setVacations(vacations);
                break;
        }
    }

    return (
        <div className="VacationsList">
            {vacationsToDisplay.map((v) => (<Card vacation={v} key={v.vacationId}></Card>))}

            <div className="filters">
                <input type="checkbox" name="favorites" value="favorites" onChange={(e) => handleFilterChange(e)} />
                <label htmlFor="favorites">My Favorites</label>

                <input type="checkbox" name="current" value="current" onChange={(e) => handleFilterChange(e)} />
                <label htmlFor="current">Current Vacations</label>

                <input type="checkbox" name="future" value="future" onChange={(e) => handleFilterChange(e)} />
                <label htmlFor="future">Future Vacations</label>
            </div>

            <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}> <ArrowBackIosIcon /> </button>
                <button disabled={endIndex >= vacations.length} onClick={() => handlePageChange(currentPage + 1)}> <ArrowForwardIosIcon /> </button>
            </div>
        </div>
    );
}

export default VacationsList;
