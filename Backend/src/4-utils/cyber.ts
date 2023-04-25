import UserModel from "../2-models/user-model";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { UnauthorizedError } from "../2-models/client-errors";
import RoleModel from "../2-models/role-model";
import { Request, Response, request, response } from "express";
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

function decodeToken(token: string): any {
  const decodedToken = jwt.verify(token, secretKey) as JwtPayload; // decode the token  
  const { user } = decodedToken; // extract the user obj
  return user;
}

function hashPassword(password: string): string {
  const salt = "travel-site";
  const hashedPassword = crypto.createHmac("sha512", salt).update(password).digest("hex");
  return hashedPassword;
}

function verifyToken(request: Request, response: Response, adminCheck?: boolean): boolean {

  const token = request.header("authorization")?.substring(7);  

  const decodedToken: any = jwt.decode(token); // decoding the token
  const expTime = new Date(decodedToken.exp * 1000); // getting the exp element of the decoded token and converting it to a date
  const currentTime = new Date(); // getting the current date
  if (currentTime <= expTime) { // if the current date and the exp date the same - attach a header with new token to the response
    console.log("fuck you");
    const newToken = createToken(decodedToken.user);
    // console.log(newToken);
    response.setHeader("Authorization", `Bearer ${newToken}`);
  }

  if(!token) throw new UnauthorizedError('No token found');

  jwt.verify(token, secretKey, (err, container:{user: UserModel})=>{
      if (err) throw new UnauthorizedError('Invalid token'); // Check for token validity
      if (adminCheck && container.user.roleId !== RoleModel.Admin) throw new UnauthorizedError('Access denied');
  });

  return true;
}

export default {
  createToken,
  decodeToken,
  hashPassword,
  verifyToken
}