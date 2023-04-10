import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { authStore } from "./Redux/AuthState";

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

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/">

            <Route index element={<ProtectedRoute>
              <Home />
            </ProtectedRoute>} />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;