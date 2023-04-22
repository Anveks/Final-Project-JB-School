import fs from "fs";
import path from "path";

// Log error:
function logError(message: string, err?: any): void {

  const now = new Date();
  const dateString = now.toISOString().slice(0, 10);
  const fileName = `errors-${dateString}.log`; // set file name
  const logDir = path.join(__dirname, "../1-assets/logs/"); // set file directory

  if (!fs.existsSync(logDir))  fs.mkdirSync(logDir); // check if exists - if not then create new

  const logFilePath = path.join(logDir, fileName); // append the error message to the log file
  const errorMessage = `${now.toISOString()} - ${err?.message}\n\n`;
  
  fs.appendFileSync(logFilePath, errorMessage); // save the errorMessage file to the logs folder
}

export default {
  logError
}
