import UserModel from "../2-models/user-model";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { UnauthorizedError } from "../2-models/client-errors";
import RoleModel from "../2-models/role-model";
import { Request, request } from "express";
import { log } from "console";

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

function verifyToken(request: Request, adminCheck?: boolean): boolean {

  const token = request.header("authorization")?.substring(7);
  if(!token) throw new UnauthorizedError("Something went wrong...");

  jwt.verify(token, secretKey, (err, container: {user: UserModel}) => {
    if(err) {
      // checking if the token has expired
      if (err.name === "TokenExpiredError") {
        const user = container.user;
        const newToken = createToken(user);
        // @ts-ignore
        request.header("Authorization", `Bearer ${newToken}`);
      } else {
        throw new UnauthorizedError("Invalid token.");
      }
    } else {
      // checking if admin
      if (adminCheck && container.user.roleId !== RoleModel.Admin) throw new UnauthorizedError("Access denied.");
    }
  });

  return true;
}

export default {
  createToken,
  decodeToken,
  hashPassword,
  verifyToken
}