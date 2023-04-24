import { NextFunction, Request, Response } from "express";
import cyber from "../4-utils/cyber";

function verifyLoggedIn(request: Request, response: Response, next: NextFunction) {
  try{
    cyber.verifyToken(request, response);
    next();
  } catch(err:any){
    next(err);
  }
}

export default verifyLoggedIn;