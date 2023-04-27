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
    const [noVacations, setNoVacations] = useState<boolean>(false);

    // handling pagination:
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 9;
    const [filters, setFilters] = useState<string[]>([]);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const vacationsToDisplay = vacations.slice(startIndex, endIndex);

    function handlePageChange(pageNumber: number) {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dataService.getAllVacations()
            .then((res) => {
                setVacations(res);
            })
            .catch((err) => notifyService.error(err.message));
    }, []);

    function handleFilterChange(e: any) {
        const checked = e.target.checked;
        const filterName: string = e.target.name;
        checked ? setFilters([...filters, filterName]) : setFilters(filters.filter((f: any) => f !== filterName))
    };

    let noVacationsMessage = <div><MiniNotFound /></div>;

    function filterVacations() {
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

        setVacations(filteredVacations);

        // adding slight delay so that the noVacations message won't be displayed upon component rendering (when we fetch the data)
        setTimeout(() => {
            if (filteredVacations.length === 0) {
                setNoVacations(true)
            } else {
                setNoVacations(false);
            }
        }, 200);

    }

    useEffect(() => {
        filterVacations();
    }, [filters]);

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
            {authStore.getState().user.roleId !== 1 && noVacations && noVacationsMessage}
            <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}> <ArrowBackIosIcon /> </button>
                <button disabled={endIndex >= vacations.length} onClick={() => handlePageChange(currentPage + 1)}> <ArrowForwardIosIcon /> </button>
            </div>
        </div >
    );
}

export default VacationsList;

