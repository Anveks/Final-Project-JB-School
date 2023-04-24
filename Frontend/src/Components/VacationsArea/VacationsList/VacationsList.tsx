import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import Card from "../../../UI/Card/Card";
import "./VacationsList.css";
import { vacationsStore } from '../../../Redux/VacationsState';
import miniNotFound from '../../../assets/img/not-found-mini.gif'
import { off } from 'process';
import MiniNotFound from '../../MiniNotFound/MiniNotFound';
import { authStore } from '../../../Redux/AuthState';

function VacationsList(): JSX.Element {

    const [currentUser, setUser] = useState<number>(authStore.getState().user?.userId);
    useEffect(() => {
        setUser(authStore.getState().user?.userId);
    })
    console.log(currentUser);

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    // pagination:
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 9;

    // transition:
    function handlePageChange(pageNumber: number) {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dataService.getAllVacations()
            .then((res) => {
                setVacations(vacationsStore.getState().vacations);
            })
            .catch((err) => notifyService.error(err.message));
    }, [currentUser]);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const vacationsToDisplay = vacations.slice(startIndex, endIndex);

    const [filters, setFilters] = useState<string[]>([]);

    function handleFilterChange(e: any) {
        const checked = e.target.checked;
        const filterName: string = e.target.name;
        checked ? setFilters([...filters, filterName]) : setFilters(filters.filter((f: any) => f !== filterName))
    };

    let noVacationsMessage;
    function filter() {
        let filteredVacations: VacationModel[] = vacationsStore.getState().vacations; // make a copy of the original vacations array

        console.log(filters);

        for (const filter of filters) {
            if (filter === "favorites") {
                filteredVacations = filteredVacations.filter((v) => v.isFollowing === 1);
            }

            if (filter === "current") {
                filteredVacations = filteredVacations.filter((v) => {
                    const startDate = new Date(v.startDate).getTime();
                    if (startDate < Date.now()) return v;
                });
            }

            if (filter === "future") {
                filteredVacations = filteredVacations.filter((v) => {
                    const startDate = new Date(v.startDate).getTime();
                    if (startDate > Date.now()) return v;
                });
            }
        };

        // TODO: add mini not found somewhere here
        setVacations(filteredVacations);
    }

    useEffect(() => {
        filter();
    }, [filters]);

    const user = authStore.getState().user?.roleId === 2 ? true : false;

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
            <div>{noVacationsMessage}</div>
            <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}> <ArrowBackIosIcon /> </button>
                <button disabled={endIndex >= vacations.length} onClick={() => handlePageChange(currentPage + 1)}> <ArrowForwardIosIcon /> </button>
            </div>
        </div >
    );
}

export default VacationsList;

