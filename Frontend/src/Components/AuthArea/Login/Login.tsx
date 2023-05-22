import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";
import beach from "../../../Assets/img/beach.jpg";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';

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

            <form onSubmit={handleSubmit(submit)}>
                <h2 className="title">Login</h2>
                <AlternateEmailIcon className="emailIcon" />
                <input type="email" {...register("email")} placeholder="email" required minLength={4} maxLength={20} autoFocus />

                <LockIcon className="passwordIcon" />
                <input type="password" {...register("password")} placeholder="password" required minLength={4} maxLength={20} />

                <button>LOGIN</button>

                <p>You don't have an account? <Link to="/register">Register.</Link></p>
            </form>
        </div>
    );
}

export default Login;
