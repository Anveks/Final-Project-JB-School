import axios from "axios";
import { AuthActionType, authStore } from "../Redux/AuthState";
import authService from "./AuthService";

class InterceptorsService {

    public createInterceptors(): void {

        // adding existing token to requests:
        axios.interceptors.request.use((request) => {
            if (authService.isLoggedIn()) {
                request.headers.Authorization = "Bearer " + authStore.getState().token;
            }
            return request;
        });
    }
}

const interceptorsService = new InterceptorsService();

export default interceptorsService;
