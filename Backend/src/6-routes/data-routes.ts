import express, { NextFunction, Request, Response } from "express";
import VacationModel from "../2-models/vacation-model";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import { createCvs } from "../4-utils/cvs-file-writer";
import cyber from "../4-utils/cyber";
import imageHandler from "../4-utils/image-handler";
import logger from "../4-utils/logger";
import dataService from "../5-services/data-service";

const router = express.Router();

router.get("/docker", async (request: Request, response: Response, next: NextFunction) => {
    try {
        console.log("something");
        response.send("Hi from docker!");
    }
    catch(err: any) {
        next(err);        
    }
});

router.get("/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const header = request.headers.authorization; // get the authorization header
        const token = header.substring(7); // extract token
        const user = await cyber.decodeToken(token); // decode it and extract the user
        const vacations = await dataService.getVacations(+user.userId); // use user id
        logger.logActivities("Vacations requested.");
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
        logger.logActivities("One vacation requested.");
        response.json(vacation);
    } catch(err: any){
        next(err);
    }
})

router.post("/vacations", [verifyLoggedIn, verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
    try {
        console.log('route');
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const newVacation = await dataService.addVacation(vacation);
        logger.logActivities("Vacation added.");
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
        logger.logActivities("Vacation edited.");
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
        logger.logActivities("Vacation deleted.");
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
        logger.logActivities("Image requested.");
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
        const user = await cyber.decodeToken(token);
        const userId = +user.userId;
        const vacationId = +request.params.id;
        console.log(userId, vacationId);
        await dataService.addLike(userId, vacationId);
        logger.logActivities("Like has been added.");
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
        const user = await cyber.decodeToken(token);
        const userId = +user.userId;
        const vacationId = +request.params.id;
        await dataService.removeLike(userId, vacationId);
        logger.logActivities("Like has been removed.");
        response.send("Like has been removed");    
    }
    catch(err: any) {
        next(err);
    }
});

// get CSV file data
router.get("/vacations/files/csv-file", [verifyLoggedIn, verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
    try {
        const CSVFile = await createCvs();
        logger.logActivities("CSV file has been requested.");
        response.send(CSVFile);
    }
    catch(err: any) {
        next(err);
    }
});

export default router;

