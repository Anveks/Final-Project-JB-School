import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import jwt from "jsonwebtoken";
import cyber from "../4-utils/cyber";
import UserModel from "../2-models/user-model";
import VacationModel from "../2-models/vacation-model";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from "../3-middleware/verify-admin";
import imageHandler from "../4-utils/image-handler";

const router = express.Router();

interface JwtPayload {
    user: UserModel;
}

router.get("/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const header = request.headers.authorization;
        const token = header.substring(7);
        const userId = cyber.decodeToken(token); 
        console.log(userId);       
        const vacations = await dataService.getVacations(+userId);
        response.json(vacations);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/vacations/:id", [verifyLoggedIn, verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacation = await dataService.getOneVacation(id);
        response.json(vacation);
    } catch(err: any){
        next(err);
    }
})

router.post("/vacations", [verifyLoggedIn, verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
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
        request.body.image = request.files?.image;
        request.body.vacationId = +request.params.id;
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

router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const imagePath = imageHandler.getImagePath(imageName);
        response.sendFile(imagePath);
    }
    catch(err: any) {
        next(err);
    }
});

// add like route
router.post("/vacations/like/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const header = request.headers.authorization;
        const token = header.substring(7);
        const userId = +cyber.decodeToken(token);
        const vacationId = +request.params.id;
        await dataService.addLike(userId, vacationId);
        response.send("Like has been added");    
    }
    catch(err: any) {
        next(err);
    }
});

// remove like route
router.delete("/vacations/like/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const header = request.headers.authorization;
        const token = header.substring(7);
        const userId = +cyber.decodeToken(token);
        const vacationId = +request.params.id;
        await dataService.removeLike(userId, vacationId);
        response.send("Like has been removed");    
    }
    catch(err: any) {
        next(err);
    }
});


export default router;

// TODO: see how can get-userId-from-token code be refactored into one-line code 
