import { OkPacket } from "mysql";
import { UnauthorizedError, ValidationError } from "../2-models/client-errors";
import { CredentialsModel } from "../2-models/credentials-model";
import UserModel from "../2-models/user-model";
import cyber from "../4-utils/cyber";
import dal from "../4-utils/dal";
import RoleModel from "../2-models/role-model";

async function register(user: UserModel): Promise<string>{

  const err = user.postValidation();
  if(err) throw new ValidationError(err);

  if(await isEmailTaken(user.email)) throw new ValidationError(`${user.email} is already in use.`);

  user.roleId = RoleModel.User;
  user.password = cyber.hashPassword(user.password);
  
  const sql = `INSERT INTO users VALUES(NULL, ?, ?, ?, ?, ?)`;

  const result: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.password, user.email, user.roleId]);
  user.userId = result.insertId;

  // add token
  const token = cyber.createToken(user);
  
  return token;
}

async function login(credentials: CredentialsModel): Promise<string>{
  const err = credentials.validate();
  if (err) throw new ValidationError(err);

  credentials.password = cyber.hashPassword(credentials.password);

  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
  const result = await dal.execute(sql, [credentials.email, credentials.password]);
  const user = result[0];

  if(!user) throw new UnauthorizedError("Incorrect email or password!");
  const token = cyber.createToken(user);
  return token;
}

async function isEmailTaken(email: string): Promise<boolean>{

  const sql = `SELECT EXISTS(SELECT * FROM users WHERE email = ?) AS isTaken`;
  const sqlResponse = await dal.execute(sql, [email]);
  const result = sqlResponse[0].isTaken;
  return result === 1; // true-false
  
}

export default {
  register,
  login
}