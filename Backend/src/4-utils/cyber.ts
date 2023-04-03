import UserModel from "../2-models/user-model";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { UnauthorizedError } from "../2-models/client-errors";
import RoleModel from "../2-models/role-model";
import { Request } from "express";

interface JwtPayload {
  user: UserModel;
}

const secretKey = "I like cute kittens.";

function createToken(user: UserModel): string{
  delete user.password;
  const container = { user };
  const options = { expiresIn: "3h" };
  const token = jwt.sign(container, secretKey, options);
  return token;
}

function decodeToken(token: string): number {
  const decodedToken = jwt.verify(token, secretKey) as JwtPayload;
  const userId = decodedToken.user.userId;
  return userId;
}

function hashPassword(password: string): string {
  const salt = "travel-site";
  const hashedPassword = crypto.createHmac("sha512", salt).update(password).digest("hex");
  return hashedPassword;
}

async function verifyToken(request: Request): Promise<boolean>{
  return new Promise<boolean>((resolve, reject) => {

    const header = request.headers.authorization;
    if(!header){
      reject(new UnauthorizedError("Access denied."))
      return;
    }

    const token = header.substring(7);
    if(!token){
      reject(new UnauthorizedError("Something went wrong..."));
      return;
    }

    jwt.verify(token, secretKey, err => {
      if(err){
        reject(new UnauthorizedError("Invalid token."))
      }
        resolve(true);
    });

  });
}

async function verifyAdmin(request: Request): Promise<boolean>{
  return new Promise((resolve, reject) => {

    const header = request.headers.authorization;
    const token = header.substring(7);

    jwt.verify(token, secretKey, (err, container: {user: UserModel}) => {

      if(err){
        reject(new UnauthorizedError("Invalid token."));
        return;
      }

    const user = container.user;
    if(user.roleId !== RoleModel.Admin){
      reject(new UnauthorizedError("Access denied!"))
    }

    resolve(true);

    });
  });
}


export default {
  createToken,
  decodeToken,
  hashPassword,
  verifyToken,
  verifyAdmin
}