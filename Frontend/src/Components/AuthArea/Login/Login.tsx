import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";
import beach from "../../../assets/img/beach.jpg";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

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

            <img src={beach} alt="beach" />
            <div className="welcome-text">
                <div>ARE YOU READY FOR YOUR NEXT VACATION?</div>
                <p>
                    <FacebookIcon fontSize="large" />
                    <TwitterIcon fontSize="large" />
                    <InstagramIcon fontSize="large" />
                </p>

                <p className="about">Welcome to our Travel Adventure! Explore breathtaking destinations, immerse yourself in vibrant cultures, and create unforgettable memories. Start your journey with us today!</p>
            </div>

            <form onSubmit={handleSubmit(submit)}>
                <h2 className="title">Login</h2>
                <label>Email:</label>
                <input type="email" {...register("email")} placeholder="example@mail.com" required minLength={4} maxLength={20} autoFocus />

                <label>Password:</label>
                <input type="password" {...register("password")} placeholder="******" required minLength={4} maxLength={20} />

                <button>Log in</button>

                <p>You don't have an account? <Link to="/register">Register.</Link></p>
            </form>
        </div>
    );
}

export default Login;
