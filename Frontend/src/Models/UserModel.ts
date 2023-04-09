import RoleModel from "./RoleModel";

export class UserModel {
  public userId: number;
  public firstName: string;
  public lastName: string;
  public password: string;
  public email: string;
  public roleId: RoleModel
}

export default UserModel;