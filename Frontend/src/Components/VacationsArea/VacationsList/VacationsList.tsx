import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import Card from "../../../UI/Card/Card";
import "./VacationsList.css";
import { vacationsStore } from '../../../Redux/VacationsState';
import MiniNotFound from '../../MiniNotFound/MiniNotFound';
import { authStore } from '../../../Redux/AuthState';
import appConfig from '../../../Utils/AppConfig';

function VacationsList(): JSX.Element {

    const user = authStore.getState().user?.roleId === 2;

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    // handling pagination:
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 9;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const vacationsToDisplay = vacations.slice(startIndex, endIndex);

    function handlePageChange(pageNumber: number) {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dataService.getAllVacations()
            .then((responseVacations) => {
                // here we both check if current user is user (and not admin) and filter the vacations by the date:
                setVacations(user ? responseVacations.filter((v) => new Date(v.startDate).getTime() > Date.now()) : responseVacations);
            })
            .catch((err) => notifyService.error(err.message));
    }, []);

    // setting an array of filters:
    const [filters, setFilters] = useState<string[]>([]);
    // adding and removing filters based on "checked" attribute:
    function handleFilterChange(e: any) {
        const checked = e.target.checked;
        const filterName: string = e.target.name;
        checked ? setFilters([...filters, filterName]) : setFilters(filters.filter((f: any) => f !== filterName))
    };

    function filterVacations() {
        // setting a 'backup' copy of vacations from redux:
        let filteredVacations: VacationModel[] = vacationsStore.getState().vacations;

        for (const filter of filters) {
            if (filter === "favorites") {
                filteredVacations = filteredVacations.filter((v) => v.isFollowing === 1);
            }

            if (filter === "current") {
                filteredVacations = filteredVacations.filter((v) => new Date(v.startDate).getTime() < Date.now());
            }

            if (filter === "future") {
                filteredVacations = filteredVacations.filter((v) => new Date(v.startDate).getTime() > Date.now());
            }
        };

        // filter out outdated vacations for regular users (and not for admins):
        if (user) {
            filteredVacations = filteredVacations.filter((v) => new Date(v.startDate).getTime() > Date.now());
            console.log(filteredVacations);
        }

        // in case no filters were applied the vacations state will go back to its original form (from the backup copy):
        setVacations(filteredVacations);
    }

    // making the component re-run the filter function every time something in the filters arr gets changed:
    useEffect(() => {
        filterVacations();
    }, [filters]);

    // adding message in case there are no vacations found after applying filters:
    let noVacationsMessage = null;
    if (filters.length > 0 && vacationsToDisplay.length === 0) {
        noVacationsMessage = <div><MiniNotFound /></div>
    }

    return (
        <div className="VacationsList">
            {vacationsToDisplay.map((v) => (<Card vacation={v} key={v.vacationId}></Card>))}
            {user && <div className="filters" >
                <input type="checkbox" name="favorites" value="favorites" onChange={(e) => handleFilterChange(e)} />
                <label htmlFor="favorites">My Favorites</label>

                <input type="checkbox" name="current" value="current" onChange={(e) => handleFilterChange(e)} />
                <label htmlFor="current">Current Vacations</label>

                <input type="checkbox" name="future" value="future" onChange={(e) => handleFilterChange(e)} />
                <label htmlFor="future">Future Vacations</label>
            </div >}
            {noVacationsMessage}
            <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}> <ArrowBackIosIcon /> </button>
                <button disabled={endIndex >= vacations.length} onClick={() => handlePageChange(currentPage + 1)}> <ArrowForwardIosIcon /> </button>
            </div>
        </div >
    );
}

export default VacationsList;

