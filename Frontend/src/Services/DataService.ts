import axios from "axios";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";

class DataService {
    public async getAllVacations(): Promise<VacationModel[]> {
       const result = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
       const vacations = result.data;
       return vacations; 
       // TODO: redux
    }

    public async getOneVacation(id: number): Promise<VacationModel> {
        const result = await axios.get<VacationModel>(appConfig.vacationsUrl + id);
        const vacation = result.data;
        return vacation;
    }

    public async editVacation(vacation: VacationModel): Promise<void>{
        const headers = { "Content-Type": "multipart/form-data" }
        await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, vacation, {headers});
        // TODO: redux
    }

    public async addVacation(vacation: VacationModel): Promise<void>{
        const headers = { "Content-Type": "multipart/form-data" };
        await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, {headers});
        // TODO: redux
    }

    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + id);

        // TODO: redux dispatch
    }
}

const dataService = new DataService();

export default dataService;
