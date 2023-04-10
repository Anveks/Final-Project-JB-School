import "./EditVacation.css";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function EditVacation(props: any): JSX.Element {
    return (

        <div className="EditVacation">
            <h3>Edit a Vacation</h3>
            <form>
                <label>Destination:</label>
                <input type="text" />

                <label>Description:</label>
                <input type="text" />

                <label>Start Date:</label>
                <input type="text" />

                <label>End Date:</label>
                <input type="text" />

                <label>Price:</label>
                <input type="text" />

                <div className="image">
                    <label htmlFor='file'>
                        <AddPhotoAlternateIcon fontSize='large' /> Upload Image
                    </label>
                    <input style={{ display: 'none' }} type='file' id="file" />
                </div>

                <button>Submit Changes</button>
            </form>
        </div>

    );
}

export default EditVacation;