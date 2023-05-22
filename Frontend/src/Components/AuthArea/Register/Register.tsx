import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import view from "../../../Assets/img/view.jpg";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

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
                <input type="text" {...register("firstName")} required minLength={2} maxLength={20} autoFocus placeholder="first name" />

                <input type="text" {...register("lastName")} required minLength={2} maxLength={20} placeholder="last name" />

                <input type="password" {...register("password")} required minLength={4} maxLength={20} placeholder="password" />

                <input type="email" {...register("email")} required minLength={4} maxLength={20} placeholder="email" />

                <button>Register</button>

                <p>Already have an account? <Link to="/login">Login.</Link></p>

            </form>

        </div>
    );
}

export default Register;

// check the backend check of reCaptcha -> backend should have a secret key that fits the site key that is send upon passing captcha;