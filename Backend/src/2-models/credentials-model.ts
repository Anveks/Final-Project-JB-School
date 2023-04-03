import Joi from "joi";

export class CredentialsModel{
  public email: string;
  public password: string;

  public constructor(credentials: CredentialsModel){
    this.email = credentials.email;
    this.password = credentials.password;
  }

  public static validationSchema = Joi.object({
    email: Joi.string().email().required().min(7).max(35),
    password: Joi.string().optional().min(4).max(1000),
  })

  public validate(): string {
    const result = CredentialsModel.validationSchema.validate(this);
    return result.error?.message;
  }
}
