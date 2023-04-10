import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CredentialsModel from "../../Models/CredentialsModel";
import authService from "../../Services/AuthService";
import notifyService from "../../Services/NotifyService";
import "./Login.css";
import { authStore } from "../../Redux/AuthState";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function submit(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notifyService.success("Welcome Back!");
            console.log(authStore.getState().user);
            console.log(authStore.getState().token);
            navigate("/");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(submit)}>
                <h3 className="title">Login</h3>
                <label>Email::</label>
                <input type="email" {...register("email")} required minLength={4} maxLength={20} autoFocus />

                <label>Password:</label>
                <input type="password" {...register("password")} required minLength={4} maxLength={20} />

                <button>Login</button>

                <p>You don't have an account? <Link to="/register">Register.</Link></p>
            </form>
        </div>
    );
}

export default Login;
