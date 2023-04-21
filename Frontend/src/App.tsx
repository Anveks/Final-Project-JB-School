import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddVacation from "./Components/VacationsArea/AddVacation/AddVacation";
import EditVacation from "./Components/VacationsArea/EditVacation/EditVacation";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { authStore } from "./Redux/AuthState";
import LikesChart from "./UI/ChartsArea/LikesChart/LikesChart";

function App(): JSX.Element {

  interface Props {
    children?: any
  }

  const ProtectedRoute = ({ children }: Props) => {
    if (!authStore.getState().token) {
      return <Navigate to="/login" />
    }
    return children;
  }

  const AdminRoute = ({ children }: Props) => {
    const isAdmin = authStore.getState().user.roleId === 1 ? true : false;
    if (!isAdmin) {
      return <Navigate to="/" />
    }
    return children;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Default Route: */}
          <Route path="/">
            <Route index element={<ProtectedRoute>
              <Home />
            </ProtectedRoute>} />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Admin Routes: */}
          <Route path="add">
            <Route index element={<AdminRoute>
              <AddVacation />
            </AdminRoute>}></Route>
          </Route>

          <Route path="edit">
            <Route index element={<AdminRoute>
              <EditVacation />
            </AdminRoute>}></Route>
          </Route>

          <Route path="chart">
            <Route index element={<AdminRoute>
              <LikesChart />
            </AdminRoute>}></Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;