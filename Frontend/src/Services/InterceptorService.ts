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

        // TODO: dont forget to delete if not needed!
        // updating token after expiration:
        axios.interceptors.response.use((response) => {
            
            if (response.headers['authorization']) { // getting the custom 'authorization' header from the backend
                const freshToken = response.headers['authorization'].substring(7); // extracting new token                
                authStore.dispatch({ type: AuthActionType.UpdateToken, payload: freshToken }); // updating the token in Redux
            }
            return response;
        });
    }
}

const interceptorsService = new InterceptorsService();

export default interceptorsService;
