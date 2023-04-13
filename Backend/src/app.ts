import express from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import dataRoutes from "./6-routes/data-routes";
import authRoutes from "./6-routes/auth-routes"
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config";
import helmet from "helmet";
import socketIoService from "./5-services/socket.io-service";

const server = express();

// preventing ddos:
// server.use(expressRateLimit({
//   windowMs: 1000,
//   max: 10,
//   message: "R u a hacker?"
// }))

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
server.use(expressFileUpload());
server.use("/api", dataRoutes);
server.use("/api", authRoutes);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));

const httpServer = server.listen(appConfig.httpPort, () => console.log("Listening on http://localhost:" + appConfig.httpPort));
socketIoService.init(httpServer);
