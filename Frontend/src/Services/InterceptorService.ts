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

            // console.log(response.headers['authorization']);
            
            if (response.headers['authorization']) {
                console.log('test');
                const freshToken = response.headers['authorization'].substring(7);
                console.log(freshToken);
                
                authStore.dispatch({ type: AuthActionType.UpdateToken, payload: freshToken });
            }
            return response;
        });
    }
}

const interceptorsService = new InterceptorsService();

export default interceptorsService;
