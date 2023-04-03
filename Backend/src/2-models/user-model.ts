import Joi from "joi";
import RoleModel from "./role-model";

export class UserModel {
  public userId: number;
  public firstName: string;
  public lastName: string;
  public password: string;
  public email: string;
  public roleId: RoleModel

  public constructor(user: UserModel){
    this.userId = user.userId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.password = user.password;
    this.email = user.email;
    this.roleId = user.roleId;
  }

  public static validationSchema = Joi.object({
    userId: Joi.number().optional().integer().positive(),
    firstName: Joi.string().required().min(2).max(20),
    lastName: Joi.string().required().min(2).max(20),
    email: Joi.string().email().required().min(7).max(35),
    password: Joi.string().optional().min(4).max(1000),
    roleId: Joi.number().optional()
});

  public validate(): string {
    const result = UserModel.validationSchema.validate(this);
    return result.error?.message;
  }
}

export default UserModel;