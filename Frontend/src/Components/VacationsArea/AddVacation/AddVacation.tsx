import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./AddVacation.css";

function AddVacation(): JSX.Element {
    const { handleSubmit, register, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState<any>();

    async function send(vacation: VacationModel) {
        try {
            const file = vacation.image as File;
            vacation.image = file;
            await dataService.addVacation(vacation);
            notifyService.success("A new vacation has been added!");
            navigate("/home");
        } catch (err: any) {
            if (err.response.status === 500) {
                notifyService.error("Image is required!")
            } else {
                notifyService.error(err);
            }
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setValue("image", file);
        }
    };

    return (
        <div className="AddVacation">
            <h3>Add a Vacation</h3>
            <form onSubmit={handleSubmit(send)}>
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
                        <AddPhotoAlternateIcon fontSize='large' /> Upload Image
                    </label>

                    <input style={{ display: 'none' }} type='file' id="file" accept="image/*" onChange={handleImageChange} />

                </div>

                {imagePreview && <img src={imagePreview} alt="Image Preview" />}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddVacation;
