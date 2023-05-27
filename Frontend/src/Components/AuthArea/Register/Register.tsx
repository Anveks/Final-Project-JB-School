import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const token = authStore.getState().token;
    const navigate = useNavigate();

    useEffect(() => {

        if (token !== null) navigate("/home");

    }, []);

    const { register, handleSubmit } = useForm<UserModel>();

    async function submit(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("Welcome!");
            navigate("/home");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register">

            <form onSubmit={handleSubmit(submit)}>
                <h2 className="title">Sign Up</h2>
                <label><PersonIcon /> First Name: </label>
                <input type="text" {...register("firstName")} required minLength={2} maxLength={60} autoFocus placeholder="Luke" />

                <label><PersonIcon /> Last Name: </label>
                <input type="text" {...register("lastName")} required minLength={2} maxLength={60} placeholder="Skywalker" />

                <label><AlternateEmailIcon /> Email:</label>
                <input type="email" {...register("email")} required minLength={7} maxLength={100} placeholder="luke.skywalker@gmail.com" />

                <label><PasswordIcon /> Password: </label>
                <input type="password" {...register("password")} required minLength={4} maxLength={1024} placeholder="password" />

                <button>Register</button>

                <div>Already have an account? <Link to="/login">Login.</Link></div>

            </form>

        </div>
    );
}

export default Register;

// check the backend check of reCaptcha -> backend should have a secret key that fits the site key that is send upon passing captcha;