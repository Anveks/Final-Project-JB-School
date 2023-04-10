import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import "./AddVacation.css";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from "react-router-dom";

function AddVacation(): JSX.Element {

    const { handleSubmit, register } = useForm<VacationModel>();
    const navigate = useNavigate();

    function send() {
        //
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
                <input type="text" {...register("startDate")} />

                <label>End Date:</label>
                <input type="text" {...register("endDate")} />

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
