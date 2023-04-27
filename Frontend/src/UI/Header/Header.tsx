import { NavLink } from "react-router-dom";
import Logout from "../../Pages/Logout/Logout";
import { authStore } from "../../Redux/AuthState";
import "./Header.css";
import dataService from "../../Services/DataService";
import notifyService from "../../Services/NotifyService";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

function Header(): JSX.Element {

    const fullName = authStore.getState().user?.firstName + " " + authStore.getState().user.lastName;

    // check if admin:
    const role = authStore.getState().user?.roleId;
    const admin = role === 1 ? true : false;

    async function handleDownload(): Promise<any> {
        try {
            // get fileData and transform it to a Blob object:
            const fileData = await dataService.getCSVFileData();
            const blob = new Blob([fileData], { type: 'text/csv' });

            // Create a link to download the CSV file:
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'vacations-data.csv';

            // trigger click:
            link.click();
        } catch (err: any) {
            notifyService.error(err.message);
        }
    }

    return (
        <div className="header">

            <p>Vacations.com</p>
            <div className="user"> Hello, {fullName}
                <Logout />

                {admin && <div className="admin-field dropdown">

                    <button className="dropBtn"><MenuIcon /></button>
                    <div className="dropdown-content">
                        <NavLink to={"add"}>  Add Vacation </NavLink>
                        <NavLink to={"chart"}> See Chart </NavLink>
                        <NavLink to={"#"} className="downloadCSV" onClick={handleDownload}>Download CSV</NavLink>
                    </div>

                </div>}

            </div>

        </div>
    );
}

export default Header;
