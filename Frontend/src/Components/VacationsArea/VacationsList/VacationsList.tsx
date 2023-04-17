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

    const [filters, setFilters] = useState<any>({
        favorites: false,
        current: false,
        future: false,
    });

    let filtersArr: any = [];
    function handleFilterChange(e: any) {
        const checked = e.target.checked;
        const filterName = e.target.name;
        if (checked) {
            filtersArr.push(filterName);
            console.log(filtersArr);
        } else {
            filtersArr = filtersArr.filter((f: any) => f !== filterName);
            console.log(filtersArr);
        }

        let resultArr: any = [];

        filtersArr.forEach((filter: any) => {

            let keyword = filter;
            switch (keyword) {
                case "favorites":
                    const favoriteVacations = originalVacations.filter((v) => v.isFollowing === 1);
                    // resultArr = [...resultArr, favoriteVacations];
                    resultArr.push(...favoriteVacations);
                    console.log(resultArr);
                    // setOriginalVacations(favoriteVacations.slice(startIndex, endIndex));
                    break;
                case "current":
                    const currentVacations = originalVacations.filter((v) => {
                        const startDate = new Date(v.startDate).getTime();
                        if (startDate < Date.now()) return v;
                    });
                    // resultArr = [...resultArr, currentVacations];
                    resultArr.push(...currentVacations);
                    console.log(resultArr);
                    // setOriginalVacations(currentVacations.slice(startIndex, endIndex));
                    break;
                case "future":
                    const futureVacations = originalVacations.filter((v) => {
                        const startDate = new Date(v.startDate).getTime();
                        if (startDate > Date.now()) return v;
                    });
                    // resultArr = [...resultArr, futureVacations];
                    resultArr.push(...futureVacations)
                    console.log(resultArr);
                    // setOriginalVacations(futureVacations.slice(startIndex, endIndex));
                    break;
            }
            setVacations(resultArr);
        });

        // if (!e.target.checked) {
        //     setVacations(originalVacations.slice(startIndex, endIndex)); // set the vacations back to original data
        //     return;
        // } else {
        //     let keyword = e.target.value;
        //     switch (keyword) {
        //         case "favorites":
        //             const favoriteVacations = originalVacations.filter((v) => v.isFollowing === 1);
        //             setVacations(favoriteVacations.slice(startIndex, endIndex));
        //             break;
        //         case "current":
        //             const currentVacations = originalVacations.filter((v) => {
        //                 const startDate = new Date(v.startDate).getTime();
        //                 if (startDate < Date.now()) return v;
        //             });
        //             setVacations(currentVacations.slice(startIndex, endIndex));
        //             break;
        //         case "future":
        //             const futureVacations = originalVacations.filter((v) => {
        //                 const startDate = new Date(v.startDate).getTime();
        //                 if (startDate > Date.now()) return v;
        //             });
        //             setVacations(futureVacations.slice(startIndex, endIndex));
        //             break;
        //         default:
        //             setVacations(originalVacations.slice(startIndex, endIndex));
        //             break;
        //     }
        // }
    }

    // const filterVacations = () => {
    //     return vacations
    //         .filter((v) => !filters.favorites || v.isFollowing === 1)
    //         .filter((v) => !filters.future || new Date(v.startDate) > new Date())
    //         .filter((v) => {
    //             if (!filters.current) return true;
    //             const now = new Date();
    //             const startDate = new Date(v.startDate);
    //             const endDate = new Date(v.endDate);
    //             return startDate <= now && endDate > now;
    //         });
    // };

    // useEffect(() => {
    //     const filteredVacations = filterVacations();
    //     setVacations(filteredVacations);
    // }, [filters])

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

