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

function VacationsList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [originalVacations, setOriginalVacations] = useState<VacationModel[]>([]); // new state

    // pagination:
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 9;

    // transition:
    function handlePageChange(pageNumber: number) {
        setVacations(originalVacations.slice((pageNumber - 1) * pageSize, pageNumber * pageSize));
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dataService.getAllVacations()
            .then((res) => {
                setVacations(res);
                setOriginalVacations(res); // backup for vacations for filters
            })
            .catch((err) => notifyService.error(err.message));
    }, []);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const vacationsToDisplay = vacations.slice(startIndex, endIndex);

    const [filters, setFilters] = useState<string[]>([]);
    let filtersArr: any = [];

    function handleFilterChange(e: any) {
        const checked = e.target.checked;
        const filterName: string = e.target.name;

        checked ? setFilters([...filters, filterName]) : setFilters(filters.filter((f: any) => f !== filterName))
    };

    function filter() {
        let resultArr: any = [];
        let filteredVacations: VacationModel[] = [...vacations]; // make a copy of the original vacations array

        for (const filter of filters) {
            if (filter === "favorites") {
                const favoriteVacations = filteredVacations.filter((v) => v.isFollowing === 1);
                if (favoriteVacations.every((fv) => !resultArr.includes(fv))) {
                    resultArr.push(...favoriteVacations);
                }
                filteredVacations = favoriteVacations; // apply the filter on the filteredVacations array
            }

            if (filter === "current") {
                const currentVacations = filteredVacations.filter((v) => {
                    const startDate = new Date(v.startDate).getTime();
                    if (startDate < Date.now()) return v;
                });
                if (currentVacations.every((cv) => !resultArr.includes(cv))) {
                    resultArr.push(...currentVacations);
                }
                filteredVacations = currentVacations; // apply the filter on the filteredVacations array
            }

            if (filter === "future") {
                const futureVacations = filteredVacations.filter((v) => {
                    const startDate = new Date(v.startDate).getTime();
                    if (startDate > Date.now()) return v;
                });
                if (futureVacations.every((fv) => !resultArr.includes(fv))) {
                    resultArr.push(...futureVacations);
                }
                filteredVacations = futureVacations; // apply the filter on the filteredVacations array
            }
        };
        setVacations(filteredVacations);
    }

    useEffect(() => {
        filter()
    }, [filters]);

    return (
        <div className="VacationsList">
            {vacationsToDisplay.map((v) => (<Card vacation={v} key={v.vacationId}></Card>))}

            {/* {vacations.length === 0 &&
                <div className='vacations-not-found'>
                    <p>No vacations found... ☹️ Try changing the filter.</p>
                    <img src={miniNotFound} />
                </div>} */}

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

            // let keyword = filter;
            // switch (keyword) {
            //     case "favorites":
            //         const favoriteVacations = originalVacations.filter((v) => v.isFollowing === 1);
            //         // resultArr = [...resultArr, favoriteVacations];
            //         resultArr.push(...favoriteVacations);
            //         console.log(resultArr);
            //         // setVacations(resultArr);
            //         // setOriginalVacations(favoriteVacations.slice(startIndex, endIndex));
            //         break;
            //     case "current":
            //         const currentVacations = originalVacations.filter((v) => {
            //             const startDate = new Date(v.startDate).getTime();
            //             if (startDate < Date.now()) return v;
            //         });
            //         // resultArr = [...resultArr, currentVacations];
            //         resultArr.push(...currentVacations);
            //         console.log(resultArr);
            //         // setVacations(resultArr);
            //         // setOriginalVacations(currentVacations.slice(startIndex, endIndex));
            //         break;
            //     case "future":
            //         const futureVacations = originalVacations.filter((v) => {
            //             const startDate = new Date(v.startDate).getTime();
            //             if (startDate > Date.now()) return v;
            //         });
            //         // resultArr = [...resultArr, futureVacations];
            //         resultArr.push(...futureVacations)
            //         console.log(resultArr);
            //         // setVacations(resultArr);
            //         // setOriginalVacations(futureVacations.slice(startIndex, endIndex));
            //         break;
            // }

