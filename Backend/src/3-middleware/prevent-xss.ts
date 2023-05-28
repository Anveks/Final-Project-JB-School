import { NextFunction, Request, Response } from "express";
import stripTags from "striptags";

// This middleware will strip tags that sent by user

function preventXss(request: Request, response: Response, next: NextFunction) {

    // Run on request.body props:
    for(const prop in request.body) {

        // If string - stript tags:
        if(typeof request.body[prop] === "string") {
            request.body[prop] = stripTags(request.body[prop]);
        }
    }

    next();
}

export default preventXss;