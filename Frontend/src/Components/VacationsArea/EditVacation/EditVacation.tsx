import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    // TODO: fix date that displays time also
    // TODO: add required here and in addVacation form

    const location = useLocation();
    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [vacation, setVacation] = useState<VacationModel>();

    useEffect(() => {
        const id = +location.state.id;

        dataService.getOneVacation(id)
            .then((res) => {
                setValue("vacationId", +res.vacationId);
                setValue("destination", res.destination);
                setValue("description", res.description);
                setValue("startDate", res.startDate);
                setValue("endDate", res.endDate);
                setValue("price", res.price);
                setVacation(res);
            })
            .catch((err) => notifyService.error(err));
    }, [])

    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await dataService.editVacation(vacation);
            notifyService.success("Vacation has been updated!");
            navigate("/");
        } catch (err: any) {
            console.log(err);
            notifyService.error(err.message);
        }
    }

    return (

        <div className="EditVacation">
            <h3>Edit a Vacation</h3>
            <form onSubmit={handleSubmit(send)}>

                <input type="hidden" {...register("vacationId")} />

                <label>Destination:</label>
                <input type="text" {...register("destination")} pattern=".{2,100}" required title="Destination must have 2-100 characters" />

                <label>Description:</label>
                <input type="text" {...register("description")} pattern=".{10,1300}" required title="Description must have 10-1300 characters" />

                <label>Start Date:</label>
                <input type="date" {...register("startDate")} defaultValue={vacation?.startDate} required />

                <label>End Date:</label>
                <input type="date" {...register("endDate")} defaultValue={vacation?.endDate} required />

                <label>Price:</label>
                <input type="number" {...register("price")} required />

                <div className="image">
                    <label htmlFor='file'>
                        <AddPhotoAlternateIcon fontSize='large' /> Upload New Image
                    </label>
                    <input style={{ display: 'none' }} type='file' id="file" accept="image/*" {...register("image", { required: false })} />
                </div>

                <img src={vacation?.imageUrl} />

                <button>Submit Changes</button>
            </form>
        </div>

    );
}

export default EditVacation;