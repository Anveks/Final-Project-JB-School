class AppConfig {
    // auth URL's
    public registerUrl = "http://localhost:4000/api/auth/register"
    public loginUrl = "http://localhost:4000/api/auth/login"

    // data URL's
    public vacationsUrl = "http://localhost:4000/api/vacations/"

    // like URL's:
    public likeUrl = "http://localhost:4000/api/vacations/like/"

    // socket Port:
    public socketUrl = "http://localhost:4001"
}

const appConfig = new AppConfig();

export default appConfig;
