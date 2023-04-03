import { NextFunction, Request, Response } from "express";
import cyber from "../4-utils/cyber";

function verifyAdmin(request: Request, response: Response, next: NextFunction) {
  try{
    cyber.verifyToken(request, true);
    next();
  } catch(err:any){
    next(err);
  }
}

export default verifyAdmin;