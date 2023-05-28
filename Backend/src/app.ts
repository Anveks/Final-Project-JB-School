import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import helmet from "helmet";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import appConfig from "./4-utils/app-config";
import authRoutes from "./6-routes/auth-routes";
import dataRoutes from "./6-routes/data-routes";
//import socketIoService from "./5-services/socket.io-service";
import logger from "./4-utils/logger";
import expressRateLimit from "express-rate-limit";
import preventXss from "./3-middleware/prevent-xss";

const server = express();

// preventing ddos:
server.use(expressRateLimit({
  windowMs: 1000, // timer to count requests
  max: 25, // max requests
  message: "R u a hacker?"
}))

// protecting headers
server.use(helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(), 
      "img-src": ["'self'"], 
    }
  }
}));

server.use((req, res, next) => {
  res.set('Referrer-Policy', 'same-origin');
  next();
});

server.use(cors());
server.use(express.json());
server.use(preventXss);
server.use(expressFileUpload());
server.use("/api", dataRoutes);
server.use("/api", authRoutes);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => {
  console.log("Listening on http://localhost:" + appConfig.port);
  logger.logActivities("Server's up and running.");
});

export default {
  server
}
