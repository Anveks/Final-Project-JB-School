import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import { authStore } from "../../../Redux/AuthState";
import StartingPage from "../../HomeArea/StartingPage/StartingPage";

function Routing(): JSX.Element {

    interface Props {
        children?: any
    }

    const ProtectedRoute = ({ children }: Props) => {
        if (!authStore.getState().token) {
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


            {/* <Route path="/list" element={<List />} />
            <Route path="/insert" element={<Insert />} /> */}
            <Route path="/starting-page" element={<StartingPage />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />

            {/* auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default Routing;
