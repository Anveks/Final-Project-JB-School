import { NextFunction, Request, Response } from "express";
import cyber from "../4-utils/cyber";

function verifyAdmin(request: Request, response: Response, next: NextFunction) {
  try{
    cyber.verifyToken(request, response, true); // sending the third argument here that indicates that we are checking if-admin
    next();
  } catch(err:any){
    next(err);
  }
}

export default verifyAdmin;