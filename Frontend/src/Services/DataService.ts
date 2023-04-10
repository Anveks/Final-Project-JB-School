import axios from "axios";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";

class DataService {
    public async getAllVacations(): Promise<VacationModel[]> {
       const result = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
       const vacations = result.data;
       return vacations; 
    }
}

const dataService = new DataService();

export default dataService;
