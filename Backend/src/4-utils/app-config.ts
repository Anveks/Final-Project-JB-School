class AppConfig {

    // Server Port:
    public port = 4000;

    // server url:
    public serverUrl = "http://localhost:" + this.port;

    // image url:
    public imageUrl = this.serverUrl + "/api/vacations/images/";

    // Database Host (on which computer the database exists):
    public mySqlHost = "localhost";

    // Database User
    public mySqlUser = "root";

    // Database Password: 
    public mySqlPassword = "";

    // Database Name: 
    public mySqlDatabase = "vacations"; // Fill in database name
}

const appConfig = new AppConfig();

export default appConfig;
