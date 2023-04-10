import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import "./AddVacation.css";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from "react-router-dom";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";

function AddVacation(): JSX.Element {

    const { handleSubmit, register } = useForm<VacationModel>();
    const navigate = useNavigate();

    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await dataService.addVacation(vacation);
            notifyService.success("A new vacation has been added!");
            navigate("/");
        } catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AddVacation">
            <h3>Add a Vacation</h3>
            <form onSubmit={handleSubmit(send)}>
                <label>Destination:</label>
                <input type="text" {...register("destination")} />

                <label>Description:</label>
                <input type="text" {...register("description")} />

                <label>Start Date:</label>
                <input type="date" {...register("startDate")} />

                <label>End Date:</label>
                <input type="date" {...register("endDate")} />

                <label>Price:</label>
                <input type="number" {...register("price")} />

                <div className="image">
                    <label htmlFor='file'>
                        <AddPhotoAlternateIcon fontSize='large' /> Upload Image
                    </label>
                    <input style={{ display: 'none' }} type='file' id="file" accept="image/*" {...register("image")} />
                </div>

                <button>Submit</button>
            </form>
        </div>
    );
}

export default AddVacation;
