import Modal from "../../../UI/Modal/Modal";
import "./EditVacation.css";

function EditVacation(props: { onClose: () => void }): JSX.Element {
    return (
        <Modal onClose={props.onClose}>
            <div className="EditVacation">
                <button onClick={props.onClose}>Close</button>
                This is the edit vacation form.
            </div>
        </Modal>
    );
}

export default EditVacation;