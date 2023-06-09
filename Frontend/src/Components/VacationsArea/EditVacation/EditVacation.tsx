import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./EditVacation.css";
import { format } from "date-fns";

function EditVacation(): JSX.Element {

    const location = useLocation();
    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [vacation, setVacation] = useState<VacationModel>();
    const [newImage, setNewImage] = useState<File>(null);

    useEffect(() => {
        const id = +location.state.id;

        dataService.getOneVacation(id)
            .then((res) => {
                console.log(res)
                setValue("vacationId", +res.vacationId);
                setValue("destination", res.destination);
                setValue("description", res.description);
                setValue("startDate", format(new Date(res.startDate), "yyyy-MM-dd"));
                setValue("endDate", format(new Date(res.endDate), "yyyy-MM-dd"));
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newFile = e.target.files[0];
        setNewImage(newFile);
    };

    return (

        <div className="EditVacation">
            <h3>Edit a Vacation</h3>
            <form onSubmit={handleSubmit(send)}>

                <input type="hidden" {...register("vacationId")} />

                <label>Destination:</label>
                <input type="text" {...register("destination")} required minLength={2} maxLength={100} />

                <label>Description:</label>
                <input type="text" {...register("description")} required minLength={20} maxLength={1300} />

                <label>Start Date:</label>
                <input type="date" {...register("startDate")} required />

                <label>End Date:</label>
                <input type="date" {...register("endDate")} required />

                <label>Price:</label>
                <input type="number" {...register("price")} required minLength={1} maxLength={10000} />

                <div className="image">

                    <label htmlFor='file'>
                        <AddPhotoAlternateIcon fontSize='large' /> Upload New Image
                    </label>

                    <input
                        style={{ display: 'none' }}
                        type='file'
                        id="file"
                        accept="image/*"
                        onChangeCapture={handleImageChange}
                        {...register("image", { required: false })}
                    />


                </div>

                <img src={newImage === null ? vacation?.imageUrl : URL.createObjectURL(newImage)} alt="image preview" />

                <button>Submit Changes</button>
            </form>
        </div>

    );
}

export default EditVacation;