import { send } from "process";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import "./EditVacation.css";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function EditVacation(props: any): JSX.Element {

    const { handleSubmit, register, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();

    const location = useLocation();
    const id = +location.state.id;
    console.log(id);

    function send() {
        //
    }

    return (

        <div className="EditVacation">
            <h3>Edit a Vacation</h3>
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
                        <AddPhotoAlternateIcon fontSize='large' /> Upload New Image
                    </label>
                    <input style={{ display: 'none' }} type='file' id="file" accept="image/*" {...register("image")} />
                </div>

                <button>Submit Changes</button>
            </form>
        </div>

    );
}

export default EditVacation;