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

        // updating token after expiration:
        axios.interceptors.response.use((response) => {
            if (response.headers['Authorization']) {
                console.log('test');
                const freshToken = response.headers['Authorization'].substring(7);
                authStore.dispatch({ type: AuthActionType.UpdateToken, payload: freshToken });
            }
            return response;
        });
    }
}

const interceptorsService = new InterceptorsService();

export default interceptorsService;
