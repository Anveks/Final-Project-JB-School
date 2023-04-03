import express from "express";
import cors from "cors";
import dataRoutes from "./6-routes/data-routes";
import authRoutes from "./6-routes/auth-routes"
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config";
import helmet from "helmet";

const server = express();

// preventing ddos:
// server.use(expressRateLimit({
//   windowMs: 1000,
//   max: 10,
//   message: "R u a hacker?"
// }))

// protecting headers
server.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(), 
      "img-src": ["'self'"], 
    }
  }
}))

server.use(cors());
server.use(express.json());
server.use("/api", dataRoutes);
server.use("/api", authRoutes);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
