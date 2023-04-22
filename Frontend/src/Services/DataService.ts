import axios from "axios";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";

class DataService {
    public async getAllVacations(): Promise<VacationModel[]> {
        let vacations = vacationsStore.getState().vacations;

    if (vacations.length === 0){
       const result = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
       vacations = result.data;
       vacationsStore.dispatch({type: VacationsActionType.FetchVacations, payload: vacations});
    }
       return vacations;
    }

    public async getOneVacation(id: number): Promise<VacationModel> {
        let vacations = vacationsStore.getState().vacations;
        let vacation = vacations.find(v => v.vacationId === id);
    if (!vacation){
        const result = await axios.get<VacationModel>(appConfig.vacationsUrl + id);
        vacation = result.data;
    }
        return vacation;
    }

    public async editVacation(vacation: VacationModel): Promise<void>{
        const headers = { "Content-Type": "multipart/form-data" }
        const result = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, vacation, {headers});
        const editedVacation = result.data;
        vacationsStore.dispatch({type: VacationsActionType.AddVacation, payload: editedVacation});
    }

    public async addVacation(vacation: VacationModel): Promise<void>{
        const headers = { "Content-Type": "multipart/form-data" };
        const result = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, {headers});
        const newVacation = result.data;
        vacationsStore.dispatch({type: VacationsActionType.AddVacation, payload: newVacation});
    }

    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + id);
        vacationsStore.dispatch({type: VacationsActionType.DeleteVacation, payload: id});
    }

    // LIKES
    // TODO: merge into one function later
    public async addLike(vacationId: number): Promise<void>{
        await axios.post(appConfig.likeUrl + vacationId);
    }

    public async removeLike(vacationId: number): Promise<void>{
        await axios.delete(appConfig.likeUrl + vacationId);
    }

    // SCV file data:
    public async getCSVFileData(): Promise<any>{
        const response = await axios.get(appConfig.CSVFileUrl);
        return response.data;
    }
}

const dataService = new DataService();

export default dataService;
