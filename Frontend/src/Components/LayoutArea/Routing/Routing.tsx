import { Navigate, Route, Routes } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import ContactUs from "../../HomeArea/ContactUs/ContactUs";
import Home from "../../HomeArea/Home/Home";
import StartingPage from "../../HomeArea/StartingPage/StartingPage";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import LikesChart from "../../VacationsArea/ChartsArea/LikesChart/LikesChart";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {

    interface Props {
        children?: any
    }

    const ProtectedRoute = ({ children }: Props) => {
        if (authStore.getState().token === null) {
            return <Navigate to="/starting-page" />
        }
        return children;
    }

    const ProtectedAdminRoute = ({ children }: Props) => {
        const isAdmin = authStore.getState().user?.roleId === 1 ? true : false;
        if (!isAdmin) {
            return <Navigate to="/" />
        }
        return children;
    }

    return (
        <Routes>
            <Route path="/home" index element={<ProtectedRoute>
                <Home />
            </ProtectedRoute>} />

            <Route path="/starting-page" element={<StartingPage />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="contactUs" element={<ContactUs />} />

            {/* auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes: */}
            <Route path="add">
                <Route index element={<ProtectedAdminRoute>
                    <AddVacation />
                </ProtectedAdminRoute>}></Route>
            </Route>

            <Route path="/home/edit">
                <Route index element={<ProtectedAdminRoute>
                    <EditVacation />
                </ProtectedAdminRoute>}></Route>
            </Route>

            <Route path="chart">
                <Route index element={<ProtectedAdminRoute>
                    <LikesChart />
                </ProtectedAdminRoute>}></Route>
            </Route>
        </Routes>
    );
}

export default Routing;
