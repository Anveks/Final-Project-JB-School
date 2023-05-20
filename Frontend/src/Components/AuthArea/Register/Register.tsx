import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import view from "../../../assets/img/view.jpg"
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
            navigate("/");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register">

            <form onSubmit={handleSubmit(submit)}>
                <h2 className="title">Sign Up</h2>
                <label>First Name:</label>
                <input type="text" {...register("firstName")} required minLength={2} maxLength={20} autoFocus />

                <label>Last Name:</label>
                <input type="text" {...register("lastName")} required minLength={2} maxLength={20} />

                <label>Password:</label>
                <input type="password" {...register("password")} required minLength={4} maxLength={20} />

                <label>Email:</label>
                <input type="email" {...register("email")} required minLength={4} maxLength={20} />

                <button>Register</button>

                <p>Already have an account? <Link to="/login">Login.</Link></p>

            </form>

            <img src={view} alt="view" />

            <div className="about-text">
                <p> <EmojiEmotionsIcon fontSize="large" /> Our travel site offers a wide range of customizable travel packages, allowing you to effortlessly plan your dream vacation.</p>
                <p> <SupportAgentIcon fontSize="large" /> Our dedicated customer support team is available 24/7 to assist you with any queries, ensuring a seamless and hassle-free travel experience.</p>
                <p> <AttachMoneyIcon fontSize="large" /> Enjoy peace of mind with our flexible refund policy, providing you with the assurance that your investment is protected in case of unforeseen circumstances.</p>
            </div>

        </div>
    );
}

export default Register;

// check the backend check of reCaptcha -> backend should have a secret key that fits the site key that is send upon passing captcha;