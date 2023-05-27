import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {

    const token = authStore.getState().token;
    const navigate = useNavigate();

    useEffect(() => {

        if (token !== null) navigate("/home");

    }, []);

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();

    async function submit(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notifyService.success("Welcome Back!");
            navigate("/");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(submit)}>
                <h2 className="title">Login</h2>

                <label><AlternateEmailIcon className="emailIcon" /> Email:</label>
                <input type="email" {...register("email")} placeholder="darth.vader@example.com" required minLength={7} maxLength={100} />

                <label><LockIcon className="passwordIcon" />Password:</label>
                <input type="password" {...register("password")} placeholder="password" required minLength={4} maxLength={1024} />

                <button>LOGIN</button>

                <div>You don't have an account? <Link to="/register">Register.</Link></div>
            </form>
        </div>
    );
}

export default Login;
