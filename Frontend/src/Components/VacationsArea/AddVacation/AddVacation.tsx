// import { useForm } from "react-hook-form";
// import VacationModel from "../../../Models/VacationModel";
// import "./AddVacation.css";
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import { useNavigate } from "react-router-dom";
// import dataService from "../../../Services/DataService";
// import notifyService from "../../../Services/NotifyService";
// import { useRef, useState } from "react";

// function AddVacation(): JSX.Element {
//     const { handleSubmit, register } = useForm<VacationModel>();
//     const navigate = useNavigate();
//     const [imagePreview, setImagePreview] = useState<any>();

//     async function send(vacation: VacationModel) {
//         try {

//             vacation.image = (vacation.image as unknown as FileList)[0];
//             console.log(vacation.image);
//             await dataService.addVacation(vacation);
//             notifyService.success("A new vacation has been added!");
//             navigate("/home");
//         } catch (err: any) {
//             notifyService.error(err);
//             console.log(err);
//         }
//     }

//     const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         event.preventDefault();
//         const file = event.target.files?.[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setImagePreview(reader.result as string);
//             };
//             reader.readAsDataURL(file);
//         }
//     };



//     return (
//         <div className="AddVacation">
//             <h3>Add a Vacation</h3>
//             <form onSubmit={handleSubmit(send)}>
//                 <label>Destination:</label>
//                 <input type="text" {...register("destination")} />

//                 <label>Description:</label>
//                 <input type="text" {...register("description")} />

//                 <label>Start Date:</label>
//                 <input type="date" {...register("startDate")} />

//                 <label>End Date:</label>
//                 <input type="date" {...register("endDate")} />

//                 <label>Price:</label>
//                 <input type="number" {...register("price")} />

//                 <div className="image">

//                     <label htmlFor='file'>
//                         <AddPhotoAlternateIcon fontSize='large' /> Upload Image
//                     </label>
//                     <input
//                         style={{ display: 'none' }} type='file' id="file" accept="image/*" {...register("image")} onChange={handleImageChange} />
//                     {imagePreview && <img src={imagePreview} alt="Image Preview" />}
//                 </div>

//                 <button>Submit</button>
//             </form>
//         </div>
//     );
// }

// export default AddVacation;

import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import "./AddVacation.css";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from "react-router-dom";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import { useRef, useState } from "react";

function AddVacation(): JSX.Element {
    const { handleSubmit, register, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState<any>();

    async function send(vacation: VacationModel) {
        try {
            const file = vacation.image as File;
            console.log(file);
            vacation.image = file;
            await dataService.addVacation(vacation);
            notifyService.success("A new vacation has been added!");
            navigate("/home");
        } catch (err: any) {
            notifyService.error(err);
            console.log(err);
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

                    <input
                        style={{ display: 'none' }} type='file' id="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && <img src={imagePreview} alt="Image Preview" />}
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddVacation;
