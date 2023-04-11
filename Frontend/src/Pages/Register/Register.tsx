import "./Register.css";
import { useForm } from "react-hook-form";
import UserModel from "../../Models/UserModel"
import authService from "../../Services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import notifyService from "../../Services/NotifyService";
import { useState } from "react";

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function submit(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("Welcome!");
            navigate("/");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register">

            <form onSubmit={handleSubmit(submit)}>
                <h2>Registration</h2>
                <label>First Name:</label>
                <input type="text" {...register("firstName")} required minLength={2} maxLength={20} autoFocus />

                <label>Last Name:</label>
                <input type="text" {...register("lastName")} required minLength={2} maxLength={20} />

                <label>Password:</label>
                <input type="password" {...register("password")} required minLength={4} maxLength={20} />

                <label>Email:</label>
                <input type="email" {...register("email")} required minLength={4} maxLength={20} />

                <button>Register</button>

                <p>You do have an account? <Link to="/login">Login.</Link></p>

            </form>

        </div>
    );
}

export default Register;

// check the backend check of reCaptcha -> backend should have a secret key that fits the site key that is send upon passing captcha;