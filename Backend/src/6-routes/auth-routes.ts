import express, { Request, Response, NextFunction } from "express";
import { CredentialsModel } from "../2-models/credentials-model";
import UserModel from "../2-models/user-model";
import authService from "../5-services/auth-service";
import logger from "../4-utils/logger";
import cyber from "../4-utils/cyber";

const router = express.Router();

// login
router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
      const credentials = new CredentialsModel(request.body);
      const token = await authService.login(credentials);
      const user = cyber.decodeToken(token);
      logger.logActivities(`UserId ${user.userId} has logged in.`);
      response.status(201).json(token);
    }
    catch(err: any) {
        next(err);
    }
});

// register
router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user = new UserModel(request.body);
    const token = await authService.register(user);
    logger.logActivities("New user has registered.");
    response.status(201).json(token);
  }
  catch(err: any) {
      next(err);
  }
});

export default router;