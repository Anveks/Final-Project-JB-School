import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import jwt from "jsonwebtoken";
import cyber from "../4-utils/cyber";
import UserModel from "../2-models/user-model";
import VacationModel from "../2-models/vacation-model";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from "../3-middleware/verify-admin";

const router = express.Router();

interface JwtPayload {
    user: UserModel;
}

router.get("/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const header = request.headers.authorization;
        const token = header.substring(7);
        const userId = cyber.decodeToken(token);      
        const vacations = await dataService.getVacations(+userId);
        response.json(vacations);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/vacations", [verifyLoggedIn, verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacation = new VacationModel(request.body);
        const newVacation = await dataService.addVacation(vacation);
        response.status(201).json(newVacation)
    }
    catch(err: any) {
        next(err);
    }
});

router.put("/vacations/:id([0-9]+)", [verifyLoggedIn, verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.id = +request.params.id;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await dataService.updateVacation(vacation);
        response.json(updatedVacation)
    }
    catch(err: any) {
        next(err);
    }
});

router.delete("/vacations/:id([0-9]+)", [verifyLoggedIn, verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await dataService.deleteVacation(id);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
});


export default router;
