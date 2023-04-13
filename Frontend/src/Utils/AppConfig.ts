class AppConfig {
    // auth URL's
    public registerUrl = "http://localhost:4000/api/auth/register"
    public loginUrl = "http://localhost:4000/api/auth/login"

    // data URL's
    public vacationsUrl = "http://localhost:4000/api/vacations/"

    // like URL's:
    public likeUrl = "http://localhost:4000/api/vacations/like/"
}

const appConfig = new AppConfig();

export default appConfig;
